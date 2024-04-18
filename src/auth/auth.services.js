const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

const { loginUser } = require('./auth.controllers')

const login = (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        loginUser(email, password)
            .then(response => {
                if (response == 'noemail') {
                    res.status(401).json({
                        message: 'This email does not exist',
                        auth:'noemail'
                    })
                }
                if (response == 'badpass') {
                    res.status(401).json({
                        message: 'Invalid Password',
                        auth: 'badpass'
                    })
                }
                if (response.id && response.email) {
                    const token = jwt.sign({
                        id: response.id,
                        email: response.email,
                        usertype:response.usertype
                    }, jwtSecret)
                    res.status(200).json({
                        message: 'Correct credentials',
                        token: token,
                        role: response.userRoleId,
                    })
                }

            })
            .catch(error => {
                res.status(400).json({ message: error.message })

            })
    } else {
        res.status(400).json({ message: 'Missing Data' })
    }
}



module.exports = { login }