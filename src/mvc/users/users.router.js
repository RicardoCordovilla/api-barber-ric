const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../../middlewares/role.middleware')
const userServices = require('./users.services')
require('../../middlewares/auth.middleware')(passport)

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth: 
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         email:
 *            type: string
 *            example: usuario@email.com
 *         active:
 *            type: boolean
 *            example: false
 *         isValidated:
 *            type: boolean
 *            example: false
 *         usertype:
 *            type: string
 *            example: normal  
 *         userRoleId:
 *            type: integer
 *            example: 1       
 */


// ruta de info propia del user


/**
 * @openapi
 * /api/users:
 *   get:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
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
 *                     $ref: "#/components/schemas/Users"
 */
router.get('/',
    passport.authenticate('jwt', { session: false }),
    // adminValidate,
    userServices.getAllUsers)

router.get('/employees', userServices.getEmployees)



// ruta de info propia del user

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Obtener datos de mi usuario logeado
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
router.route('/me')
    .get(
        passport.authenticate('jwt', { session: false }),
        userServices.getMyUser)


    .patch(
        passport.authenticate('jwt', { session: false }),
        userServices.patchMyUser)
    .delete(
        passport.authenticate('jwt', { session: false }),
        userServices.deleteMyUser)


router.route('/user/:id')
    .get(userServices.getUserById)
    .patch(
        passport.authenticate('jwt', { session: false }),
        adminValidate,
        userServices.patchUser)
    .delete(
        passport.authenticate('jwt', { session: false }),
        adminValidate,
        userServices.deleteUser)


module.exports = router