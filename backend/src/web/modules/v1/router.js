const router = require('express').Router();

//IMPORT ROUTES

//Auth Router
const authRouter = require('./auth/router');

// USE ROUTER

//Auth Router
router.use('/auth', authRouter);

module.exports = router;