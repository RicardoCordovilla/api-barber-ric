const uuid = require("uuid")
const Customers = require("./customers.model")

const createCustomer = async (req, res) => {
    const customer = req.body
    const { name, phone, ciruc, email, address } = customer || {}   // Destructuring    
    if (!name || !phone) {
        res.status(400).json({
            message: 'name, email and password are required',
            fields: {
                name: 'string',
                phone: 'string'
            }
        })
    }
    else {
        const newCustomer = await Customers.create({
            id: uuid.v4(),
            name: name,
            phone: phone,
            ciruc: ciruc,
            email: email,
            address: address
        })
        res.status(201).json({ newCustomer })
    }
}

const updateCustomer = async (req, res) => {
    const customer = req.body
    const { name, ciruc, email, address, phone } = customer || {}   // Destructuring
    const { id } = req.params

    const updatedCustomer = await Customers.update({
        name: name,
        ciruc: ciruc,
        email: email,
        address: address,
        phone: phone
    }, {
        where: {
            id: id
        }
    })
    res.status(201).json({ updatedCustomer })
}

const getCustomers = async (req, res) => {
    const customers = await Customers.findAll({
        order: [
            ['serial', 'ASC']
        ]
    })
    res.status(200).json(customers)
}

module.exports = {
    createCustomer,
    updateCustomer,
    getCustomers
}