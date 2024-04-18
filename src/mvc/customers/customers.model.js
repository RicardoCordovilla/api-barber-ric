const db = require('../../utils/database')

const { DataTypes } = require('sequelize')

const Customers = db.define('customers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    serial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    ciruc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Quito'
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // todo: codreference
},
    { timestamps: false })

module.exports = Customers