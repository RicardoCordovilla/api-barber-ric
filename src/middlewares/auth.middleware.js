const passport = require('passport')
const { jwtSecret } = require('../config')
const { getUserById } = require('../mvc/users/users.controllers')

const JwStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = () => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: jwtSecret
    }
    passport.use(
        new JwStrategy(options,async(decoded,done)=>{
            try {
                const response=await getUserById(decoded.id)
                if(!response){
                    return done(null,false)
                }
                console.log('decoded JWT', decoded)
                return done(null,decoded)
            } catch (error) {return done(error,false)}
        })
    )
}