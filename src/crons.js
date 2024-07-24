const cron = require('node-cron');
const sendWts = require('./notificationService');
const { getBookingsByDateAndHour, getBookingsByDate, getEmployeePhoneNName } = require('./cronsFetching');
const { format, addMinute, addHour } = require('@formkit/tempo');

const cronEver15min = '*/5 * * * * *'
const morningHour = '17:40'



const startCrons = () => {
    cron.schedule(cronEver15min, () => {
        const currentDate = new Date()
        const currentOffset = addHour(currentDate, -5)
        console.log('running a task every 15 minutes');
        const date = format(currentOffset, 'YYYY-MM-DD')
        const hourMinusOne = format(addMinute(currentOffset, 60), 'HH:mm')
        console.log(date, hourMinusOne)
        // get bookings for today, check if there are any bookings for the current hour -1 hour and send a reminder
        getBookingsByDateAndHour(date, hourMinusOne)
            .then(booking => {
                console.log(booking)
                if (booking) {
                    console.log(booking)
                    const employeeId = booking.employeeId
                    const employee = getEmployeePhoneNName(employeeId)
                        .then(employee => {
                            console.log(employee)
                            const message = `Hola  ${employee.name}, hoy tienes una cita con ${booking.customer} a las ${booking.hour}`
                            sendWts(employee.phone, message)
                        })
                        .catch(err => console.log(err))
                }
            })

        const currentHour= format(currentOffset, 'HH:mm')
        console.log(currentHour)
        if (format(currentOffset, 'HH:mm') === morningHour) {
            console.log('sending morning messages........................')
            getBookingsByDate(date)
                .then(bookings => {
                    console.log(bookings)
                    bookings.forEach(booking => {
                        const employeeId = booking.employeeId
                        const employee = getEmployeePhoneNName(employeeId)
                            .then(employee => {
                                console.log(employee)
                                const message = `Hola  ${employee.name}, hoy tienes una cita con ${booking.customer} a las ${booking.hour}`
                                sendWts(employee.phone, message)
                            })
                            .catch(err => console.log(err))
                    })
                })
        }

    });



}

module.exports = startCrons

