const rolesControllers = require('./roles.controllers');
const router = require('express').Router();

router.route('/')
    .get(rolesControllers.getRoles)
    .post(rolesControllers.createRole)

router.route('/:id')
    .patch(rolesControllers.updateRole)

module.exports = router