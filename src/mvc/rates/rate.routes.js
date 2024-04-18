const router = require('express').Router();
// const passport = require('passport')

const rateServices = require('./rate.services');

router.route('/:id')
    .get(rateServices.getRatesByEmployeeId)

router.route('/')
    .post(rateServices.createRate)

module.exports = router
    