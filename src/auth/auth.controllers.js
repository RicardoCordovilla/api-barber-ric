const { getUserByEmail } = require('../mvc/users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email)
        if (user) {
            const verifyPassword = comparePassword(password, user.password)
            if (verifyPassword) return user
            else return 'badpass'
        }
        if (!user) return 'noemail'
        // user.password contiene la contraseña encriptada desde la db
    }
    catch (error) { return error }
}



module.exports = { loginUser }
