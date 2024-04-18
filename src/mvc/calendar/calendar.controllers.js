const uuid = require("uuid")
const Calendar = require("./calendar.model")

const createCalendar = async (req, res) => {
    try {
        const calendar = req.body
        userId = req.user.id
        const { date, hours } = calendar   // Destructuring    
        if (!date || !hours) {
            res.status(400).json({
                message: 'date, hours and userId are required',
                fields: {
                    date: 'string',
                    hours: 'array',
                    userId: 'string'
                }
            })
        }
        else {
            const newCalendar = await Calendar.create({
                id: uuid.v4(),
                date: date,
                hours: hours,
                userId: userId
            })
            res.status(201).json({ newCalendar })
        }
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'This date already exists' })
        }
        // res.status(400).json({ message: error.message })
    }
}

const updateCalendar = async (req, res) => {
    const calendar = req.body
    userId = req.user.id
    const { date, hours } = calendar || {}   // Destructuring
    const { id } = req.params

    const updatedCalendar = await Calendar.update({
        date: date,
        hours: hours,
        userId: userId
    }, {
        where: {
            id: id
        }
    })
    res.status(201).json({ updatedCalendar })
}

const deleteCalendar = async (req, res) => {
    const { id } = req.params
    await Calendar.destroy({
        where: {
            id: id
        }
    })
    res.status(200).json({ message: 'Calendar deleted' })
}

const getCalendarsByUser = async (req, res) => {
    const userId = req.query.employeeId
    if (!userId) {
        res.status(400).json({
            message: 'employeeId is required',
            fields: {
                employeeId: 'string'
            }
        })
        return
    }
    const calendar = await Calendar.findAll({
        where: {
            userId: userId
        },
        attributes: ['id', 'date', 'hours'],
        // attributes: ['date', 'hours'],
        order: [
            ['date', 'ASC']
        ]
    })
    res.status(200).json(calendar)
}

module.exports = {
    createCalendar,
    updateCalendar,
    deleteCalendar,
    getCalendarsByUser
}