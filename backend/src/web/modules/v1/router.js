const router = require('express').Router();

//IMPORT ROUTES

const authRouter = require('./auth/router');
const restaurantRouter = require('./restaurant/router');
const userRouter = require('./user/router');


// USE ROUTER

//Auth Router
router.use('/auth', authRouter);
router.use('/restaurant', restaurantRouter);
router.use('/user', userRouter);

module.exports = router;