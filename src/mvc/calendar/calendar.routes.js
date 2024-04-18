const calendarControllers = require('./calendar.controllers');
const router = require('express').Router();
const passport = require('passport')
require('../../middlewares/auth.middleware')(passport)

// ---------- SCHEMA -------------------------------
/**
 * @openapi
 * components:
 *   schemas:
 *     Calendar:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           example: '2024-02-08'
 *           required: true
 *         hours:
 *           type: array
 *           example: ['08:00', '09:00']
 *           required: true
 *         userId:
 *           type: UUID
 *           example: 14c435a4-26fc-433f-a4ec-c001710a11fb
 *           required: true
 *           description: este id es del usuario
 */


router.route('/')
    // ------------ CREAR UN CALENDARIO --------------
    /**
     * @openapi
     * /api/calendar:
     *  post:
     *   tags:
     *    - Calendar
     *  summary: Crear un nuevo calendario
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/Calendar'
     * responses:
     * 201:
     * description: Nuevo calendario creado
     * content:
     * application/json:
     * type: object
     * $ref: "#/components/schemas/Calendar"
     */
    .post(
        passport.authenticate('jwt', { session: false }),
        calendarControllers.createCalendar
    )


router.route('/employee')
    // ----------listar todos los calendarios
    /**
     * @openapi
     * /api/calendar:
     *  get:
     *  tags:
     *   - Calendar
     * summary: Listar todos los calendarios
     * responses:
     * 200:
     * description: OK
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * calendars:
     * type: array
     * items:
     * $ref: "#/components/schemas/Calendar"
     * example:
     * calendars: []
     */
    .get(calendarControllers.getCalendarsByUser)

router.route('/:id')

    // ------------ ACTUALIZAR UN CALENDARIO --------------
    /**
     * @openapi
     * /api/calendar/{id}:
     * patch:
     * tags:
     * - Calendar
     * parameters:
     * - in: path
     * name: id
     * required: true
     * type: string
     * description: id del calendario
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/Calendar'
     * responses:
     * 201:
     * description: Calendario actualizado
     * content:
     * application/json:
     * type: object
     * $ref: "#/components/schemas/Calendar"
     */
    .patch(calendarControllers.updateCalendar)

    // ------------ ELIMINAR UN CALENDARIO --------------
    /**
     * @openapi
     * /api/calendar/{id}:
     * delete:
     * tags:
     * - Calendar
     * parameters:
     * - in: path
     * name: id
     * required: true
     * type: string
     * description: id del calendario
     * responses:
     * 200:
     * description: Calendario eliminado
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message:
     * type: string
     * example: Calendario eliminado
*/
    .delete(calendarControllers.deleteCalendar)


module.exports = router;




