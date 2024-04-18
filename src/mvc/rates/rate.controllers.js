const uuid = require('uuid')
const Rates = require('./rate.model')


const getRatesByEmployeeId = async (req, res) => {
    const { id } = req.params
    const rates = await Rates.findAll({
        where: {
            employeeId: id
        }
    })
    res.status(200).json(rates)
}

const createRate = async (req, res) => {
    const rate = req.body
    const { employeeId, stars, service, notes, producId } = rate
    if (!employeeId || !stars) {
        res.status(400).json({
            message: 'employeeId, service and stars are required',
            fields: {
                employeeId: 'uuid',
                service: 'uuid',
                stars: 'number'
            }
        })
    }
    else {
        const newRate = await Rates.create({
            id: uuid.v4(),
            employeeId: employeeId,
            producId: service,
            stars: stars,
            notes: notes
        })
        res.status(201).json(newRate)
    }
}


module.exports = {
    getRatesByEmployeeId,
    createRate
}