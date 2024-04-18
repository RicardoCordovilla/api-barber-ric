const payTypesControllers = require('./paytypes.controllers');
const router = require('express').Router();


/**
 * @openapi
 * components:
 *   schemas:
 *     PayTypes:
 *       type: object
 *       properties:
 *         title: 
 *           type: string
 *           example: cash
 */

router.route('/')

    /**
    * @openapi
    * /api/payments:
    *   post:
    *     tags: [PayTypes]
    *     summary: Crear un nuevo tupo de pago
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/PayTypes'
    *     responses:
    *       201:
    *         description: Metodo de pago creado
    */
    .post(payTypesControllers.createPaytype)


    // ---------------Listar
    /**
     * @openapi
     * /api/payments:
     *   get:
     *     tags:
     *       - PayTypes
     *     summary: Obtener todos los tipos de pagos
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
     *                     $ref: "#/components/schemas/PayTypes"
     */
    .get(payTypesControllers.getPaytypes)


module.exports = router