const router = require('express').Router()
const passport = require('passport')
require('../../middlewares/auth.middleware')
const bookingsControllers = require('./booking.controllers')
const adminValidate = require('../../middlewares/role.middleware')


// ---------- SCHEMA -------------------------------
/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 * schemas:
 *   Bookings:
 *     type: object
 *     properties:
 *       employeeId:
 *         type: UUID
 *         example: 14c435a4-26fc-433f-a4ec-c001710a11fb
 *         required: true
 *         description: este id viende del token
 *     customerId:
 *       type: UUID
 *       example: 14c435a4-26fc-433f-a4ec-c001710a11fb
 *       required: true
 *       description: id del cliente
 *     date:
 *       type: string
 *       example: '2024-04-09'
 *       required: true
 *       description: fecha de la reserva
 *     hour:
 *       type: string
 *       example: '10:00'
 *       required: true
 *       description: hora de la reserva
 *     service:
 *       type: string
 *       example: 'Corte de cabello'
 *       required: true
 *       description: servicio a realizar
 */

// ================== CREAR UNA NUEVA RESERVA ==================
/**
 * @openapi
 * /api/bookings:
 *   post:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags: [Bookings]
 *     summary: Crear una nueva reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Bookings'
 *     responses:
 *       201:
 *         description: Reserva creada
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/Bookings'
 */
router.post('/',
    // passport.authenticate('jwt', { session: false }),
    bookingsControllers.createBooking)

// ================== OBTENER TODAS LAS RESERVAS POR RANGO DE FECHA ==================
/**
 * @openapi
 * /api/bookings/date/all:
 *   get:
 *     parameters:
 *       - in: query
 *         name: from
 *         type: string
 *         required: true
 *       - in: query
 *         name: to
 *         type: string
 *         required: true
 *     tags: [Bookings]
 *     summary: Obtener todas las reservas por rango de fecha
 *     responses:
 *       200:
 *         description: Reservas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Bookings'
 */

router.get('/date/all', bookingsControllers.getAllBookingsByDate)

// ================== OBTENER TODAS LAS RESERVAS DE UN USUARIO ==================   

router.get('/',
    // passport.authenticate('jwt', { session: false }),
    bookingsControllers.getBookingsByUserAndDate
)


// ================== OBTENER RESERVAS POR CLIENTE ==================

router.get('/customer', passport.authenticate('jwt', { session: false }), bookingsControllers.getBookingsByCustomerAndDate)

// ================== OBTENER MIS RESERVAS ==================

router.get('/my', passport.authenticate('jwt', { session: false }), bookingsControllers.getMyBookingsByDate)

// ================== ACTUALIZAR UNA RESERVA ==================

router.patch('/id/:id', bookingsControllers.updateBooking)

// ================== ACTUALIZAR LA HORA DE UNA RESERVA ==================

router.patch('/hour', bookingsControllers.updateBookingHours)

// ================== OBTENER UNA RESERVA ==================

// ================== ACTUALIZAR RESERVAS POR FECHA ESPECIFICA ==================


router.delete('/:id', bookingsControllers.deleteBooking)

module.exports = router
