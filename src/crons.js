
const Bookings = require('./mvc/bookings/booking.model')
const Users = require('./mvc/users/users.model')

const getBookingsByDateAndHour = async (date, hour) => {
    const booking = await Bookings.findOne({
        where: {
            date: date,
            hour: hour
        },
        order: [['date', 'ASC'], ['hour', 'ASC']],
    })
    return JSON.parse(JSON.stringify(booking))
}

const getEmployeePhoneNName = async (employeeId) => {
    const employee = await Users.findByPk(employeeId)
    const { phone, name } = employee
    return { phone, name }
}

module.exports = { getBookingsByDateAndHour, getEmployeePhoneNName }