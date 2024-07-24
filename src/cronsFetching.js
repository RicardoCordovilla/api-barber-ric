
const Bookings = require('./mvc/bookings/booking.model')
const Users = require('./mvc/users/users.model')


const getEmployeesPhoneNName = async () => {
    const employees = await Users.findAll({
        where: {
            userRoleId: 3
        },
        attributes: ['id', 'phone', 'name']
    })
    return JSON.parse(JSON.stringify(employees))
}

const getBookingsByDateAndEmployee = async (date, employeeId) => {
    const booking = await Bookings.findAll({
        where: {
            date: date,
            employeeId: employeeId
        },
        order: [['hour', 'ASC']],
    })
    return JSON.parse(JSON.stringify(booking))
}

const getBookingDateAndHourByEmployee = async (date, hour, employeeId) => {
    const booking = await Bookings.findOne({
        where: {
            date: date,
            hour: hour,
            employeeId: employeeId
        },
        order: [['hour', 'ASC']],
    })
    return JSON.parse(JSON.stringify(booking))
}



module.exports = { getEmployeesPhoneNName, getBookingsByDateAndEmployee, getBookingDateAndHourByEmployee }