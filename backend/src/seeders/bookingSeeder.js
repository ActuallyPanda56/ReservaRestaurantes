const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

const bookings = [];

for (let i = 0; i < 10; i++) {
  bookings.push({
    id: uuidv4(),
    user_id: '', // Will be populated later
    restaurant_id: '', // Will be populated later
    status: 'Confirmed',
    adults: faker.number.int({ min: 1, max: 4 }),
    children: faker.number.int({ min: 0, max: 3 }),
    price: faker.commerce.price(),
    date: faker.date.future(),
    start_time: `${faker.number.int({ min: 0, max: 5 })}:${faker.number.int({ min: 0, max: 59 })}`,
    end_time: `${faker.number.int({ min: 16, max: 23 })}:${faker.number.int({ min: 0, max: 59 })}`,
  });
}

module.exports = bookings;
