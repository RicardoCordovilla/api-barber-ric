const db=require('../../utils/database')

const {DataTypes}=require('sequelize')

const Userstype = db.define('usertype',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'normal'
    }

},{timestamps:false})

module.exports=Userstype