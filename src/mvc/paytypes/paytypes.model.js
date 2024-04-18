const db = require('../../utils/database')
const { DataTypes } = require('sequelize')

const Paytypes = db.define('paytypes', {
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
        default: 'cash'
    }
},
    { timestamps: false }
)

db.sync()

module.exports = Paytypes

