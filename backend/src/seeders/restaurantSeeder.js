const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const restaurants = [];

for (let i = 0; i < 30; i++) {
  const restaurantCapacity = [];

  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
    restaurantCapacity.push({
      tableCapacity: faker.number.int({ min: 2, max: 8 }),
      tableCount: faker.number.int({ min: 5, max: 20 }),
    });
  }

  restaurants.push({
    id: uuidv4(),
    user_id: "", // Will be populated later
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    short_description: faker.lorem.sentence(),
    banner: faker.image.url(),
    pictures: JSON.stringify([faker.image.url(), faker.image.url()]),
    menu_picture: faker.image.url(),
    menu_info: JSON.stringify([
      {
        name: faker.word.noun(),
        description: faker.word.words(),
        price: faker.commerce.price(),
      },
      {
        name: faker.word.noun(),
        description: faker.word.words(),
        price: faker.commerce.price(),
      },
    ]),
    type: faker.word.noun(),
    address: faker.location.streetAddress(),
    phone_number: JSON.stringify([faker.phone.number(), faker.phone.number()]),
    rating: faker.number.int({ min: 1, max: 5 }),
    capacity: JSON.stringify(restaurantCapacity),
    age_restricted: faker.number.binary(),
  });
}

module.exports = restaurants;
