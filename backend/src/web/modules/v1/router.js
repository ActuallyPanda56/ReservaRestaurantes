const router = require('express').Router();

//IMPORT ROUTES

const authRouter = require('./auth/router');
const restaurantRouter = require('./restaurant/router');
const userRouter = require('./user/router');
const bookingRouter = require('./booking/router');


// USE ROUTER

router.use('/auth', authRouter);
router.use('/restaurant', restaurantRouter);
router.use('/user', userRouter);
router.use('/booking', bookingRouter);

module.exports = router;