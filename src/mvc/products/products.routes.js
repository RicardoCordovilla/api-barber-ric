const router = require('express').Router();

const passport = require('passport');
const productsControllers = require('./products.controllers');


/**
 * @openapi
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Producto 1 
 *         description:
 *            type: string
 *            example: Descripción producto1
 *         price:
 *            type: double
 *            example: 5.84    
 */


router.route('/')

    /**
     * @openapi
     * /api/products:
     *   get:
     *     tags:
     *       - Products
     *     summary: Obtener todos los productos
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
     *                     $ref: "#/components/schemas/Products"
     */
    .get(productsControllers.getProducts)


    /**
    * @openapi
    * /api/products:
    *   post:
    *     tags: [Product]
    *     summary: Crear un nuevo producto
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/Products'
    *     responses:
    *       201:
    *         description: Producto nuevo creado
    */
    .post(productsControllers.createProduct)

router.route('/:id')

    /**
    * @openapi
    * /api/products/{id}:
    *   patch:
    *     tags: [Product]
    *     parameters: 
    *       - in: path
    *         name: id
    *         type: integer
    *         required: true
    *         description: product ID
    *     summary: Editar un producto
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/Products'
    *     responses:
    *       201:
    *         description: Producto editado correctamente
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               $ref: "#/components/schemas/Products"
    *       404:
    *         description: Prodcuto no encontrado
    */
    .patch(
        passport.authenticate('jwt', { session: false }),
        productsControllers.updateProduct)
    .delete(
        passport.authenticate('jwt', { session: false }),
        productsControllers.deleteProduct)

module.exports = router
