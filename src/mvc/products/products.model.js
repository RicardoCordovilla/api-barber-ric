const db = require('../../utils/database')

const { DataTypes } = require('sequelize')

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 1.00
    },
    // caneditprice:{
    //     type: DataTypes.BOOLEAN,
    //     allowNull: true,
    //     defaultValue: false
    // },
    service: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 40
    },

},
    { timestamps: false }
)

db.sync()

module.exports = Products