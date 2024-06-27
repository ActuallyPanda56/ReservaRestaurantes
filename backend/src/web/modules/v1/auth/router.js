const router = require('express').Router();
const { login, register } = require('./controller/auth');
const { updateUser } = require('./controller/updateUser');

router.post('/login', login);
router.post('/register', register);
router.post('/updateUser', updateUser);

module.exports = router;