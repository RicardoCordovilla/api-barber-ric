const uuid = require('uuid')
const { hashPassword } = require('../../utils/crypto')

const Users = require('../users/users.model')
const Roles = require('../roles/roles.model')
const Rates = require('../rates/rate.model')

const getAllUsers = async () => {
    const data = await Users.findAll()
    return data
}

const getAllEmployees = async () => {
    const data = await Users.findAll({
        where: { userRoleId: 3 },
        attributes: ['id', 'name']
    })
    return data
}

const getUserById = async (id) => {
    const data = await Users.findByPk(id, {
        include: [
            { model: Roles, as: 'user_role', attributes: ['title'] }
        ]
    })


    return data
}

const createUser = async (data) => {
    const newUser = Users.create({
        id: uuid.v4(),
        name: data.name,
        email: data.email,
        active: data.active,
        isValidated: data.isValidated,
        userRoleId: data.userRoleId ? data.userRoleId : 3,
        password: hashPassword(data.password)
    })
    return newUser
}

const updateUser = async (id, data) => {
    const result = await Users.update(data, {
        where: { id }
    })
    return result
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: { id }
    })
    return data
}


const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: { email }
    })
    return data
}

module.exports = {
    getAllUsers,
    getAllEmployees,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
}