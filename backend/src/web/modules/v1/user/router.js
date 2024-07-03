const router = require('express').Router();
const { getUsers, getUserById, deleteUser, updateUser } = require('./controller/user');

//IMPORT ROUTES

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);

module.exports = router;