const uuid = require('uuid')
const Invoices = require("./invoices.model")
const Users = require('../users/users.model')
const Customers = require('../customers/customers.model')
const Paytypes = require('../paytypes/paytypes.model')
const { Op } = require('sequelize')
const { nowDate } = require('../../utils/dateformat')

const createInvoice = async (req, res) => {
    const invoice = req.body
    const userId = req.user.id
    const {
        customerId,
        purchase,
        total,
        tip,
        notes,
        image,
        paytypeId,
    } = invoice || {}   // Destructuring    
    if (!customerId) { res.status(400).json({ message: 'customerId is required' }) }
    else if (!purchase) {
        res.status(400).json({
            message: 'purchase is required',
            fields: {
                purchase: [
                    {
                        product: 'string',
                        quantity: 'number',
                        price: 'number',
                        percent: 'number'
                    }
                ]
            }
        })
    }
    // else if (!total) { res.status(400).json({ message: 'total is required' }) }
    // else if (!notes) { res.status(400).json({ message: 'notes is required' }) }
    // else if (!image) { res.status(400).json({ message: 'image is required' }) }
    // else if (!paytypeId) { res.status(400).json({ message: 'paytypeId is required' }) }

    else {

        const newInvoice = await Invoices.create({
            id: uuid.v4(),
            employeeId: userId,
            customerId,
            date: nowDate(),
            purchase,
            total,
            tip,
            notes,
            image,
            paytypeId
        })
        res.status(201).json({ newInvoice })
    }
}

const getInvoicesByDate = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    const invoices = await Invoices.findAll({
        where: {
            date: {
                [Op.between]: [from, to]
            },
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'paytypeId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
            {
                model: Customers,
                as: 'customer',
                attributes: ['name']
            },
            {
                model: Paytypes,
                as: 'paytype',
                attributes: ['title']
            }
        ]
    })
    res.status(200).json(invoices)
}


const getMyInvoicesByDate = async (req, res) => {
    const userId = req.user.id
    const from = req.query.from
    const to = req.query.to
    const invoices = await Invoices.findAll({
        where: {
            employeeId: userId,
            date: {
                [Op.between]: [from, to]
            },
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'paytypeId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
            {
                model: Customers,
                as: 'customer',
                attributes: ['name']
            },
            {
                model: Paytypes,
                as: 'paytype',
                attributes: ['title']
            }
        ]
    })
    res.status(200).json(invoices)
}


const getInvoicesByPaymentType = async (req, res) => {
    const { paytypeId } = req.params
    const from = req.query.from
    const to = req.query.to
    const invoices = await Invoices.findAll({
        where: {
            paytypeId: paytypeId,
            date: {
                [Op.between]: [from, to]
            }
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'paytypeId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
            {
                model: Customers,
                as: 'customer',
                attributes: ['name']
            },
            {
                model: Paytypes,
                as: 'paytype',
                attributes: ['title']
            }
        ]
    })
    res.status(200).json(invoices)
}

const getInvoicesByCustomer = async (req, res) => {
    const { customerId } = req.params
    const from = req.query.from
    const to = req.query.to
    const invoices = await Invoices.findAll({
        where: {
            customerId: customerId,
            date: {
                [Op.between]: [from, to]
            }
        },
        attributes: {
            exclude: ['id', 'employeeId', 'customerId', 'paytypeId', 'createdAt', 'updatedAt'],
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
            {
                model: Customers,
                as: 'customer',
                attributes: ['name']
            },
            {
                model: Paytypes,
                as: 'paytype',
                attributes: ['title']
            }
        ]
    })
    res.status(200).json(invoices)
}

const getInvoicesByEmployee = async (req, res) => {
    const { employeeId } = req.params
    const from = req.query.from
    const to = req.query.to
    const invoices = await Invoices.findAll({
        where: {
            employeeId: employeeId,
            date: {
                [Op.between]: [from, to]
            }
        },
        include: [
            {
                model: Users,
                as: 'employee',
                attributes: ['name']
            },
            {
                model: Customers,
                as: 'customer',
                attributes: ['name']
            },
            {
                model: Paytypes,
                as: 'paytype',
                attributes: ['title']
            }
        ]
    })
    res.status(200).json(invoices)
}



module.exports = {
    createInvoice,
    getInvoicesByDate,
    getMyInvoicesByDate,
    getInvoicesByPaymentType,
    getInvoicesByCustomer,
    getInvoicesByEmployee
}