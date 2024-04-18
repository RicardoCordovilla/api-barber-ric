const db = require('../../utils/database')

const { DataTypes } = require('sequelize')

const Roles = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        default: 'employee'
    }
},
    { timestamps: false }
)

db.sync()

module.exports = Roles
