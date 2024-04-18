const db = require('../../utils/database')

const { DataTypes } = require('sequelize')

const Invoices = db.define('invoices', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    serial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },

    employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'employeeId',
        references: {
            key: 'id',
            model: 'users',
        },

    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'customerId',
        references: {
            key: 'id',
            model: 'customers',
        },
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    purchase: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    },
    tip: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0.00
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paytypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'paytypeId',
        references: {
            key: 'id',
            model: 'paytypes',
        },
    },

},
    { timestamps: true })

db.sync()


module.exports = Invoices