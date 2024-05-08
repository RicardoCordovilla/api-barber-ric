const userRouter = require('./mvc/users/users.router')
const authRouter = require('./auth/auth.router')
const initModels = require('./mvc/initModels')
const path = require("path")

const db = require('./utils/database')
const express = require('express')
const cors = require('cors') // Add this line
const app = express()
// settings

app.use(cors({ origin: 
    [
        'http://localhost:9000',
        'https://lumosbarber.netlify.app/',
    ],
 }))


app.use(express.json())




// swagger docs
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')


const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api para la pelu",
            vesrions: "1.0.0"
        },
        servers: [
            { url: "http://localhost:9000" },
            // {url:"http://localhost:9000"}
        ],
        // components: {
        //     securitySchemes: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'bearer',
        //             bearerFormat: 'JWT',
        //         }
        //     }
        // },
        // security: [{
        //     bearerAuth: []
        // }]
    },
    apis: [
        `${path.join(__dirname, './auth/auth.router.js')}`,
        // `${path.join(__dirname, './mvc/users/users.router.js')}`,
        // `${path.join(__dirname, './mvc/products/products.routes.js')}`,
        // `${path.join(__dirname, './mvc/paytypes/paytypes.routes.js')}`,
        `${path.join(__dirname, './mvc/customers/customers.routes.js')}`,
        // `${path.join(__dirname, './mvc/cashouts/cahsouts.routes.js')}`,
        `${path.join(__dirname, './mvc/invoices/invoices.routes.js')}`,

        // 'src/auth/auth.router.js'
    ]
}


const swaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
        authAction: {
            JWT: {
                name: 'JWT',
                schema: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: ''
                },
                value: 'jwt <JWT token here>'
            }
        }
    }
};





db.authenticate()
    .then(() => { console.log('DB authenticated') })
    .catch(err => { console.log(err) })

db.sync()
    .then(() => { console.log('DB synced') })
    .catch(err => { console.log(err) })

initModels()

const { port } = require('./config')




// middlewares
app.use('/api/auth', authRouter)
app.use('/api/roles', require('./mvc/roles/roles.routes'))
app.use('/api/users', userRouter)
// app.use('/api/employees', require('./mvc/employees/employees.routes'))
app.use('/api/customers', require('./mvc/customers/customers.routes'))
app.use('/api/payments', require('./mvc/paytypes/paytypes.routes'))
app.use('/api/invoices', require('./mvc/invoices/invoices.routes'))
app.use('/api/cash', require('./mvc/cashouts/cahsouts.routes'))
app.use('/api/calendar', require('./mvc/calendar/calendar.routes'))
app.use('/api/bookings', require('./mvc/bookings/bookings.routes'))
app.use('/api/rates', require('./mvc/rates/rate.routes'))

app.use('/api/products', require('./mvc/products/products.routes'))
// swagger middleware
app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerSpec)))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK',
        users: `localhost:${port}/api/users`
    })
})

app.listen(port, () => {
    console.log(`server started at ${port}`)
})