const db = require('../../utils/database')
const { DataTypes } = require('sequelize')

const Calendar = db.define('calendar', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hours: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: 'users'
        }
    }
},
    { timestamps: false })

db.sync()

module.exports = Calendar
