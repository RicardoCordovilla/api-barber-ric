const router = require('express').Router()
const passport = require('passport')
require('../../middlewares/auth.middleware')
const invoicesControllers = require('./invoices.controllers')
const adminValidate = require('../../middlewares/role.middleware')


// ---------- SCHEMA -------------------------------
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     Invoices:
 *       type: object
 *       properties:
 *         employeeId:
 *           type: UUID
 *           example: 14c435a4-26fc-433f-a4ec-c001710a11fb
 *           required: true
 *           description: este id viende del token
 *         customerId:
 *           type: UUID
 *           example: 8e286434-0631-46af-b86c-658097bda280
 *           required: true
 *         date: 
 *           type: string
 *           example: '2024-02-08'
 *           required: true
 *         purchase:
 *           type: array
 *           example: [{"product": "producto1", quantity: 1, percent: 0.6}]
 *           required: true
 *         notes: 
 *           type: string
 *           example: 'na'
 *         image:
 *           type: string
 *           example: ''
 *         paytypeId:
 *           type: integer
 *           example: 1
 *           required: true
 *         total:
 *            type: float
 *            example: 9.50
 *            required: true
 */



// ===================== CREAR UNA NUEVA FACTURA =====================

/**
 * @openapi
 * /api/invoices:
 *   post:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Invoices
 *     summary: Crear una nueva factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Invoices'     
 *     responses:
 *       201:
 *         description: Factura creada
 *         content:
 *           application/json:
 *             type: object
 *             $ref: "#/components/schemas/Invoices"
 */
router.post('/',
    passport.authenticate('jwt', { session: false }),
    invoicesControllers.createInvoice)

// ===================================================================

    //   ---------------------------------------------------------

// ============== LISTAR FACTURAS POR RANGO DE FECHA =================
 /**
 * @openapi
 * /api/invoices/date/all:
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
 *       - Invoices
 *     summary: Listar las facturas en un rango de fecha
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: "#/components/schemas/Invoices"
 */
router.get('/date/all',
    passport.authenticate('jwt', { session: false }),
    invoicesControllers.getInvoicesByDate)

// ===================================================================



// =========== LISTAR FACTURAS POR EMPLEADO Y RANGO DE FECHA===========

 /**
 * @openapi
 * /api/invoices/employee/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
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
 * 
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Invoices
 *     summary: Listar las facturas en un rango de fecha
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: "#/components/schemas/Invoices"
 */

router.get('/employee/:employeeId',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    invoicesControllers.getInvoicesByEmployee)

// =====================================================================   

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    invoicesControllers.getMyInvoicesByDate)


router.get('/payment/:paytypeId',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    invoicesControllers.getInvoicesByPaymentType)

router.get('/customer/:id',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    invoicesControllers.getInvoicesByCustomer)

module.exports = router 
