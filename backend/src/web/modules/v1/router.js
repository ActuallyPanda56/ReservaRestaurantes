const router = require('express').Router();

//IMPORT ROUTES

//Auth Router
const authRouter = require('./auth/router');
const restaurantRouter = require('./restaurant/router');

// USE ROUTER

//Auth Router
router.use('/auth', authRouter);
router.use('/restaurant', restaurantRouter);

module.exports = router;