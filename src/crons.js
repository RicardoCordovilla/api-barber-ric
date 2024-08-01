const cron = require('node-cron');
const sendWts = require('./notificationService');
const { getEmployeesPhoneNName, getBookingsByDateAndEmployee, getBookingDateAndHourByEmployee } = require('./cronsFetching');
const { format, addMinute, addHour } = require('@formkit/tempo');

// const cronEver15min = '15 * * * * *'
const cronEver15min = '*/15 * * * *'
const morningHour = '00:00'
// const morningHour = '18:22'

const getAllDayBookingsEmployee = (date, formatedDate, employee) => {
    const { id, name, phone } = employee
    console.log(`Buscando reservas para ${name} hoy: ${date}`)
    let message = ""
    getBookingsByDateAndEmployee(date, id)
        .then(bookings => {
            if (bookings.length === 0) {
                console.log(`No tienes reservas para hoy ${date}`)
                // sendWts(phone, formatedDate, null, `No tienes reservas para hoy`)
            }
            else {
                bookings.forEach(booking => {
                    message += `Hora: ${booking.hour} - Servicio: ${booking.service} - Cliente: ${booking.customer}`
                })
                sendWts(phone, formatedDate, null, message)
            }
        })
}

const getNextHourBookingEmployee = (employee, date, hour) => {
    const { id, name, phone } = employee
    console.log('-----------------------------------', 'getNextHourBookingEmployee', '-----------------------------------')
    console.log(`Buscando reservas para ${name} en la siguiente hora: ${hour}, ${date}`)
    let message = ""
    getBookingDateAndHourByEmployee(date, hour, id)
        .then(booking => {
            if (!booking) {
                return
                // message = `No tienes reservas para la siguiente hora`
            }
            else {
                message += `Cliente: ${booking.customer}-Servicio: ${booking.service}`
            }
            sendWts(phone, null, hour, message)
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
        const formatedDate = format(localCurrentDate, 'dddd DD/MMM', 'es')
        console.log(`Cron job running at ${format(localCurrentDate, 'HH:mm')}`)
        console.log(`Next hour: ${format(nextHour, 'HH:mm')}`)
        console.log(`Morning hour: ${morningHour}`)

        getEmployeesPhoneNName()
            .then(employees => {
                employees.forEach(employee => {
                    if (format(localCurrentDate, 'HH:mm') === morningHour)
                        getAllDayBookingsEmployee(formatedLocalCurrentDate, formatedDate, employee)
                    getNextHourBookingEmployee(employee, formatedLocalCurrentDate, format(nextHour, 'HH:mm'))
                })
            })
            .catch(err => { console.log(err) })
    })
}

module.exports = startCrons

