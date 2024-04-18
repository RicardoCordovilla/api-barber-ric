const router = require('express').Router()
const {login}=require('./auth.services')

const { registerUser } = require('../mvc/users/users.services')



/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Tommy V  
 *           required: true
 *         email:
 *            type: string
 *            example: usuario@email.com
 *            required: true
 *         password:
 *            type: string
 *            example: 123456
 *            required: true
 */


// /api/auth/register

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Crear nuevo usuario
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
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
 *                     $ref: "#/components/schemas/User"
 */

router.post('/register', registerUser)


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login del usuario
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/login',login)

module.exports = router 
