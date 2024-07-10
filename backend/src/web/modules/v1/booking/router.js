const router = require('express').Router();
const { createBooking, deleteBooking, getBookingById, getBookings, updateBooking } = require('./controller/booking.js');
const { getBookingsByUserId, getBookingsByRestaurantId } = require('./controller/bookingUtils.js');

// BASIC CRUD OPERATIONS
router.post('/create', createBooking);
router.get('/', getBookings);
router.get('/id/:id', getBookingById);
router.put('/update/:id', updateBooking);
router.delete('/delete/:id', deleteBooking);

// BOOKING UTILS
router.get('/user/:userId', getBookingsByUserId);
router.get('/restaurant/:restaurantId', getBookingsByRestaurantId);

module.exports = router;