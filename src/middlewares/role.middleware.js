const adminValidate = (req, res, next) => {
    const role = req.user.usertype
    console.log(req.user)
    if (role === 'admin') {
        return next()
    }
    else
        return res.status(401).json({ message: 'No authoraized acount' })
}

module.exports = adminValidate