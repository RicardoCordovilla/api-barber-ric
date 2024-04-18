const db= require('../../utils/database')

const {DataTypes} = require('sequelize')

const Rates = db.define('rates',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    stars:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    notes:{
        type: DataTypes.STRING,
        allowNull: true
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            key:'id',
            model:'products'
        }
    }
},
{timestamps:false}
)

db.sync()

module.exports = Rates