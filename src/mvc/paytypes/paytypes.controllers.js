const Paytypes = require("./paytypes.model")

const createPaytype = async (req, res) => {
    const paytype = req.body
    const { title } = paytype || {}   // Destructuring    
    if (!title) {
        res.status(400).json({
            message: 'title is required',
            fields: {
                title: 'string'
            }
        })
    }
    else {
        const newPaytype = await Paytypes.create({
            title: title
        })
        res.status(201).json({ newPaytype })
    }
}

const getPaytypes = async (req, res) => {
    const paytypes = await Paytypes.findAll()
    res.status(200).json(paytypes)
}   

module.exports = {
    createPaytype,
    getPaytypes
}

