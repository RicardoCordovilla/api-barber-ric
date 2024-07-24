const cron = require('node-cron');
const sendWts = require('./notificationService');
const { getBookingsByDateAndHour, getBookingsByDate, getEmployeePhoneNName } = require('./cronsFetching');
const { format, addMinute, addHour } = require('@formkit/tempo');

// const cronEver15 = '*/30 * * * * *'
const cronEver15 = '* 0,15,30,45 * * * *'
const cronEveryMorning = '* 21 17 * * *'



const startCrons = () => {
    cron.schedule(cronEver15, () => {
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

    });

    cron.schedule(cronEveryMorning, () => {
        const currentDate = new Date()
        const currentOffset = addHour(currentDate, -5)
        console.log('running a task every morning at 8:00');
        const date = format(currentOffset, 'YYYY-MM-DD')
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
    });


}

module.exports = startCrons

