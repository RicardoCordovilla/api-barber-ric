const customersControllers = require('./customers.controllers');
const router = require('express').Router();


// schema customer
/**
 * @openapi
 * components:
 *   schemas:
 *     Customers:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Cliente 1
 *           requiered: true 
 *         ciruc:
 *            type: string
 *            example: 17187920212
 *         email:
 *            type: string
 *            example: usuario@email.com
 *         address:
 *            type: string
 *            example: Quito
 *         phone:
 *            type: string
 *            example: 0989898898 
 */

router.route('/')

    // ------------ CREAR UN CLIENTE --------------
    /**
     * @openapi
     * /api/customers:
     *   post:
     *     tags:
     *       - Customers
     *     summary: Crear un nuevo cliente
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             $ref: '#/components/schemas/Customers'     
     *     responses:
     *       201:
     *         description: Nuevo cliente creado
     *         content:
     *           application/json:
     *             type: object
     *             $ref: "#/components/schemas/Customers"
     */
    .post(customersControllers.createCustomer)


    // ----------listar todos los clientes
    /**
 * @openapi
 * /api/customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Listar todos los clientes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Customers"
 */
    .get(customersControllers.getCustomers)

router.route('/:id')
    .patch(customersControllers.updateCustomer)


module.exports = router
