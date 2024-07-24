const cron = require('node-cron');
const sendWts = require('./notificationService');
const { getEmployeesPhoneNName, getBookingsByDateAndEmployee, getBookingDateAndHourByEmployee } = require('./cronsFetching');
const { format, addMinute, addHour } = require('@formkit/tempo');

const cronEver15min = '*/15 * * * *'
const morningHour = '19:05'

const getAllDayBookingsEmployee = (employee) => {
    const { id, name, phone } = employee
    let message = `Hola ${name}, estas son tus reservas para hoy: \n`
    getBookingsByDateAndEmployee(format(new Date(), 'YYYY-MM-DD'), id)
        .then(bookings => {
            if (bookings.length === 0) {
                message = `No tienes reservas para hoy`
                console.log(`No tienes reservas para hoy`)
                // sendWts(phone, `No tienes reservas para hoy`)
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
        })
}





const startCrons = () => {
    cron.schedule(cronEver15min, () => {
        const currentDate = new Date()
        const nextHour = addHour(currentDate, 1)
        const currentOffset = addHour(currentDate, -5)
        let employees
        getEmployeesPhoneNName()
            .then(employees => {
                employees.forEach(employee => {
                    if (format(currentOffset, 'HH:mm') === morningHour)
                        getAllDayBookingsEmployee(employee)
                    getNextHourBookingEmployee(employee, currentDate, format(nextHour, 'HH:mm'))
                })
            })
            .catch(err => { console.log(err) })
    })
}

module.exports = startCrons

