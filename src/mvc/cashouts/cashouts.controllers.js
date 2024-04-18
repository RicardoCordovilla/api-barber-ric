const { Op } = require("sequelize")
const { nowDate } = require("../../utils/dateformat")
const Cashouts = require("./cashouts.model")
const Users = require("../users/users.model")

const createCashout = async (req, res) => {
    const cashout = req.body
    const userId = req.user.id
    const { amount, notes, type } = cashout || {}   // Destructuring    
    if (!amount) {
        res.status(400).json({
            message: 'amount is required',
            fields: {
                amount: 'float',
                type: 'string'
            }
        })
    }
    else {
        const newCahsout = await Cashouts.create({
            date: nowDate(),
            amount,
            type,
            notes,
            employeeId: userId,
        })
        res.status(201).json({ newCahsout })
    }
}

const getCashoutsByDate = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const cashouts = await Cashouts.findAll({
        where: {
            date: {
                [Op.between]: [from, to]
            },
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
        ]
    })
    res.status(200).json(cashouts)
}

const getCashoutsByEmployee = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const employeeId = req.params.employeeId
    const cashouts = await Cashouts.findAll({
        where: {
            employeeId,
            date: {
                [Op.between]: [from, to]
            },
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
        ]
    })
    res.status(200).json(cashouts)
}

const getCashoutsByUser = async (req, res) => {
    const userId = req.user.id
    const from = req.query.from
    const to = req.query.to
    const cashouts = await Cashouts.findAll({
        where: {
            employeeId: userId,
            date: {
                [Op.between]: [from, to]
            },
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
        ]
    })
    res.status(200).json(cashouts)
}


module.exports = {
    createCashout,
    getCashoutsByDate,
    getCashoutsByEmployee,
    getCashoutsByUser
}