const db = require('../../utils/database')
const { DataTypes } = require('sequelize')

const Booking = db.define('booking', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'employeeId',
        references: {
            key: 'id',
            model: 'users'
        }
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ci: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
}
    , { timestamps: false })

db.sync()

module.exports = Booking
