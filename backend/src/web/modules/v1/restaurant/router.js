const router = require('express').Router();
const { createRestaurant } = require('./controller/restaurant');

router.post('/create', createRestaurant);

module.exports = router;