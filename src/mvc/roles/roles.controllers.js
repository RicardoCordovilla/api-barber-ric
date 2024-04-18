const Roles = require('./roles.model')

const createRole= async (req, res) => {
    const role = req.body
    const { title } = role || {}   // Destructuring    
    if (!title) {
        res.status(400).json({
            message: 'title is required',
            fields: {
                title: 'string'
            }
        })
    }
    else {

        const newRole = await Roles.create({
            title: title
        })
        res.status(201).json({ newRole })
    }
}

const updateRole = async (req, res) => {
    const role = req.body
    const { title } = role || {}   // Destructuring
    const { id } = req.params
    if (!title) {
        res.status(400).json({
            message: 'title is required',
            fields: {
                title: 'string'
            }
        })
    }
    else {
        const updatedRole = await Roles.update({
            title: title
        }, {
            where: {
                id: id
            }
        })
        res.status(201).json({ updatedRole })
    }
}


const getRoles = async (req, res) => {
    const roles = await Roles.findAll()
    res.status(200).json(roles)
}

module.exports = {  
    createRole,
    updateRole,
    getRoles,

}