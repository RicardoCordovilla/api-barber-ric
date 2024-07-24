const uuid = require("uuid")
const Bookings = require("./booking.model")
const { Op, where } = require("sequelize")
const Users = require("../users/users.model")

const createBooking = async (req, res) => {
    const booking = req.body
    // employeeId = u
    const { date, hour, service, customer, phone, employeeId } = booking   // Destructuring    
    if (!date || !hour || !service || !customer) {
        res.status(400).json({
            message: 'date, hour, service, userId and customer are required',
            fields: {
                date: 'string',
                hour: 'string',
                service: 'string',
                // userId: 'uuid',
                customer: 'string',
                phone: 'string',
                employeeId: 'uuid'
            }
        })
    }
    else {
        const newBooking = await Bookings.create({
            id: uuid.v4(),
            date: date,
            hour: hour,
            service: service,
            // userId: userId,
            customer: customer,
            phone: phone,
            employeeId: employeeId
        })
        res.status(201).json(newBooking)
    }
}

const updateBookingHours = async (req, res) => {
    const booking = req.body
    id = req.query.id
    const { hour } = booking
    if (!hour) {
        res.status(400).json({
            message: 'hour is required',
            fields: {
                hour: 'string',
            }
        })
    }
    else {
        const updatedBooking = await Bookings.update({ hour: hour }, { where: { id: id } })
        res.status(200).json(updatedBooking)
    }
}


const updateBooking = async (req, res) => {
    const booking = req.body
    const { date, hour, service, userId } = booking   // Destructuring    
    if (!date || !hour || !service, userId) {
        res.status(400).json({
            message: 'date, hour, service, userId and customerId are required',
            fields: {
                date: 'string',
                hour: 'string',
                service: 'string',
                userId: 'uuid',
            }
        })
    }
    else {
        const { id } = req.params
        const updatedBooking = await Bookings.update({ id: id }, {
            date: date,
            hour: hour,
            service: service,
            userId: userId,
            customerId: customerId
        })
        res.status(200).json(updatedBooking)
    }
}


const deleteBooking = async (req, res) => {
    const { id } = req.params
    await Bookings.destroy({
        where: { id: id },
        truncate: false
    }, (err, data) => {
        if (err) {
            res.status(404).json({ message: 'Booking not found' })
        }
        else {
            res.status(200).json({ message: 'Booking deleted' })
        }
    })
}

const getAllBookingsByDate = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const bookings = await Bookings.findAll({
        where: {
            date: {
                [Op.between]: [from, to]
            },
        },
        order: [['date', 'ASC'], ['hour', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['id', 'name', 'email']
            },
            'customer'
        ]
    })
    res.status(200).json(bookings)
}


const getBookingsByUserAndDate = async (req, res) => {
    const date = req.query.date
    // const from = req.query.from
    // const to = req.query.to
    const userId = req.query.employeeId
    const bookings = await Bookings.findAll({
        where: {
            employeeId: userId,
            date: date
        },
        order: [['date', 'ASC'], ['hour', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // include: [
        //     {
        //         model: Users,
        //         as: 'employee',
        //         attributes: ['id', 'name', 'email']
        //     },
        //     // 'customer'
        // ]
    })
    res.status(200).json(bookings)
}

const getMyBookingsByDate = async (req, res) => {
    const date = req.query.date
    const userId = req.user.id
    const bookings = await Bookings.findAll({
        where: {
            employeeId: userId,
            date: date
        },
        order: [['date', 'ASC'], ['hour', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        // include: [
        //     {
        //         model: Users,
        //         as: 'employee',
        //         attributes: ['id', 'name', 'email']
        //     },
        //     // 'customer'
        // ]
    })
    res.status(200).json(bookings)
}

const getBookingsByCustomerAndDate = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const customerId = req.query.customerId
    const bookings = await Bookings.findAll({
        where: {
            customerId: customerId,
            date: {
                [Op.between]: [from, to]
            },
        },
        order: [['date', 'ASC'], ['hour', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['id', 'name', 'email']
            },
            'customer'
        ]
    })
    res.status(200).json(bookings)
}

module.exports = {
    createBooking,
    updateBooking,
    updateBookingHours,
    deleteBooking,
    getAllBookingsByDate,
    getBookingsByUserAndDate,
    getMyBookingsByDate,
    getBookingsByCustomerAndDate,
}