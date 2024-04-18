const UserTypes = require("./usertype.model")


const getUserTypes = async (req, res) => {
    const userTypes = await UserTypes.findAll()
    res.status(200).json(userTypes)
}

const createUserType = async (req, res) => {
    const userType = req.body
    const { title } = userType || {}   // Destructuring    
    if (!title) {
        res.status(400).json({
            message: 'title is required',
            fields: {
                title: 'string'
            }
        })
    }
    else {

        const newUserType = await UserTypes.create({
            title: title
        })
        res.status(201).json({ newUserType })
    }
}

module.exports = {
    getUserTypes,
    createUserType
}