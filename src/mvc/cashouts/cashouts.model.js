const db = require('../../utils/database')
const { DataTypes } = require('sequelize')

const Cashouts = db.define('cashouts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'adelanto'
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'employeeId',
        references: {
            key: 'id',
            model: 'users',
        },
    }
},
    { timestamps: true }
)

db.sync()

module.exports = Cashouts

