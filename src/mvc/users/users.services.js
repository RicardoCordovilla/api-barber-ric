const usersControllers = require('./users.controllers')
// const { hashPassword } = require('../../utils/crypto')


const getAllUsers = (req, res) => {
    usersControllers.getAllUsers()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const getEmployees = (req, res) => {
    usersControllers.getAllEmployees()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}


const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}


const registerUser = (req, res) => {
    const { name, email, password } = req.body
    if (name && email && password) {
        usersControllers.createUser({ name, email, password })
            .then(data => {
                res.status(200).json({
                    message: 'Usuario creado exitosamente',
                    response: 'OK',
                    data: data
                })
            })
            .catch((err) => {
                res.status(404).json({ message: err.message })
            })
    }
    else {
        res.status(400)
            .json({
                message: 'Missing fields',
                fields: {
                    name: 'string',
                    email: 'email@email',
                    password: 'string'
                }
            })
    }
}


const patchUser = (req, res) => {
    const id = req.params.id
    const { name } = req.body
    // const pass=hashPassword(password)
    usersControllers.updateUser(id, { name })
        .then(data => {
            if (data[0]) {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully` })
            }
            else { res.status(200).json({ message: 'Invalid ID' }) }
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}


const deleteUser = (req, res) => {
    const id = req.params.id
    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            }
            else { res.status(200).json({ message: 'Invalid ID' }) }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}


// myuserservices ruta users/me
const getMyUser = (req, res) => {
    const id = req.user.id //req.user contiene la info del token desencriptado
    usersControllers.getUserById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id;
    const { name } = req.body;

    usersControllers
        .updateUser(id, { name })
        .then(() => {
            res.status(200).json({ message: `Your user was edited succesfully!` });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id;

    usersControllers.updateUser(id, { active: false })
        .then(() => {
            res.status(200).json({ message: `Your user was deleted succesfully!` });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        })
}

module.exports = {
    getAllUsers,
    getEmployees,
    getUserById,
    registerUser,
    patchUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}