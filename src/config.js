require('dotenv').config()//solo queremos que se ejecute el config

const config = {
    port: process.env.PORT || 9000, //9000 si no existe 
    nodeEnv: process.env.NODE_ENV || 'development', //desarrollo, testing, produccion
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT || '5432'
    }


}

module.exports = config