const rateControllers = require('./rate.controllers');

const getRatesByEmployeeId = (req, res) => {
    rateControllers.getRatesByEmployeeId(req.params.id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const createRate = (req, res) => {
    rateControllers.createRate(req.body)
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

module.exports = {
    getRatesByEmployeeId,
    createRate
}