const router = require('express').Router()
const passport = require('passport')
require('../../middlewares/auth.middleware')
const cashoutsControllers = require('./cashouts.controllers')
const adminValidate = require('../../middlewares/role.middleware')


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     CashOuts:
 *       type: object
 *       properties:
 *         date: 
 *           type: string
 *           example: '2024-02-08'
 *           required: true
 *         amount:
 *            type: float
 *            example: 9.50
 *            required: true
 *         type:
 *            type: string
 *            example: adelanto
 *            required: true
 *         notes:
 *            type: string
 *            example: 'Compra de fundas'
 *         employeeId:
 *            type: UUID
 *            example: '12asd7qw39asdj8asd8812l' 
 *            required: true    
 */

// -----------------------------------------------------


// ------------ CREAR UNA NUEVA SALIDA DE CAJA --------
/**
 * @openapi
 * /api/cash:
 *   post:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - CashOuts
 *     summary: Crear un registro de salida de caja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/CashOuts'     
 *     responses:
 *       201:
 *         description: Salida de caja registrada
 *         content:
 *           application/json:
 *             type: object
 *             $ref: "#/components/schemas/CashOuts"
 */
router.post('/',
    passport.authenticate('jwt', { session: false }),
    cashoutsControllers.createCashout)


// ----------- LISTAR SALIDAS DE CAJA POR FECHA --------
  /**
 * @openapi
 * /api/cash:
 *   get:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *       - in: query
 *         name: from
 *         type: string
 *         required: true
 *       - in: query
 *         name: to
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - CashOuts
 *     summary: Listar las salidas de caja en un rango de fecha
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array 
 *               $ref: "#/components/schemas/CashOuts"
 */
router.get('/',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    cashoutsControllers.getCashoutsByDate)

router.get('/employee/:employeeId',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    cashoutsControllers.getCashoutsByEmployee)

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    cashoutsControllers.getCashoutsByUser)


module.exports = router

