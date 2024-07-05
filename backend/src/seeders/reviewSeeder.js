const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

const reviews = [];

for (let i = 0; i < 10; i++) {
  reviews.push({
    id: uuidv4(),
    user_id: '', // Will be populated later
    restaurant_id: '', // Will be populated later
    rating: faker.number.int({ min: 1, max: 5 }),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  });
}

module.exports = reviews;
