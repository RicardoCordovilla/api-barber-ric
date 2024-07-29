const cron = require('node-cron');
const sendWts = require('./notificationService');
const { getEmployeesPhoneNName, getBookingsByDateAndEmployee, getBookingDateAndHourByEmployee } = require('./cronsFetching');
const { format, addMinute, addHour } = require('@formkit/tempo');

const cronEver15min = '*/30 * * * * *'
// const cronEver15min = '*/15 * * * *'
const morningHour = '18:10'

const getAllDayBookingsEmployee = (date, employee) => {
    const { id, name, phone } = employee
    console.log(`Buscando reservas para ${name} hoy: ${date}`)
    let message = `Hola ${name}, estas son tus reservas para hoy: \n`
    getBookingsByDateAndEmployee(date, id)
        .then(bookings => {
            if (bookings.length === 0) {
                message = `No tienes reservas para hoy`
                console.log(`No tienes reservas para hoy`)
                sendWts(phone, `No tienes reservas para hoy`)
            }
            else {
                bookings.forEach(booking => {
                    message += `Hora: ${booking.hour} - Servicio: ${booking.service} - Cliente: ${booking.customer} \n`
                })
            }
            sendWts(phone, message)
            console.log(phone, message)
        })
}

const getNextHourBookingEmployee = (employee, date, hour) => {
    const formatedDate = format(date, 'YYYY-MM-DD')
    const { id, name, phone } = employee
    console.log(`Buscando reservas para ${name} en la siguiente hora: ${hour}`)
    let message = `Hola ${name}, esta es tu reserva para la siguiente hora: \n`
    getBookingDateAndHourByEmployee(formatedDate, hour, id)
        .then(booking => {
            if (!booking) {
                return
                // message = `No tienes reservas para la siguiente hora`
                // sendWts(phone, `No tienes reservas para la siguiente hora`)
            }
            else {
                message += `Hora: ${booking.hour} - Servicio: ${booking.service} - Cliente: ${booking.customer} \n`
            }
            sendWts(phone, message)
            console.log(phone, message)
            return
        })
}





const startCrons = () => {
    cron.schedule(cronEver15min, () => {
        const currentDate = new Date()
        const localCurrentDate = addHour(currentDate, -5)
        const nextHour = addMinute(localCurrentDate, 45)
        const formatedLocalCurrentDate = format(localCurrentDate, 'YYYY-MM-DD')
        console.log(`Cron job running at ${format(localCurrentDate, 'HH:mm')}`)
        console.log(`Next hour: ${format(nextHour, 'HH:mm')}`)
        console.log(`Morning hour: ${morningHour}`)

        getEmployeesPhoneNName()
            .then(employees => {
                employees.forEach(employee => {
                    if (format(localCurrentDate, 'HH:mm') === morningHour)
                        getAllDayBookingsEmployee(formatedLocalCurrentDate, employee)
                    getNextHourBookingEmployee(employee, localCurrentDate, format(nextHour, 'HH:mm'))
                })
            })
            .catch(err => { console.log(err) })
    })
}

module.exports = startCrons

