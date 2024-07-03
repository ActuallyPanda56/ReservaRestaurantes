const router = require('express').Router();
const { createRestaurant, deleteRestaurant, getRestaurantById, getRestaurants, updateRestaurant } = require('./controller/restaurant');

router.post('/create', createRestaurant);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.put('/update/:id', updateRestaurant);
router.delete('/delete/:id', deleteRestaurant);

module.exports = router;