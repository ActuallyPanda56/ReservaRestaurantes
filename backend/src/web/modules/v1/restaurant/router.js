const router = require('express').Router();
const { createRestaurant, deleteRestaurant, getRestaurantById, getRestaurants, updateRestaurant } = require('./controller/restaurant');
const { getRestaurantByPage, getRestaurantByUserId, getRestaurantByFilters, getRestaurantsByRating } = require('./controller/restaurantUtils.js');


// BASIC CRUD OPERATIONS
router.post('/create', createRestaurant);
router.get('/', getRestaurants);
router.get('/id/:id', getRestaurantById);
router.put('/update/:id', updateRestaurant);
router.delete('/delete/:id', deleteRestaurant);

// RESTAURANT UTILS
router.get('/page/:page', getRestaurantByPage);
router.get('/user/:userId', getRestaurantByUserId);
router.post('/filters', getRestaurantByFilters);
router.get('/by-rating/', getRestaurantsByRating);

module.exports = router;