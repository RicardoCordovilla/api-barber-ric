const userTypesController = require('./usertypes.controllers');
const router = require('express').Router();

router.route('/')
    .get(userTypesController.getUserTypes)
    .post(userTypesController.createUserType)

module.exports = router