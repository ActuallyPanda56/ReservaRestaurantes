const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

const users = [];

for (let i = 0; i < 10; i++) {
  users.push({
    id: uuidv4(),
    name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    identification: faker.string.numeric(10),
    birth_date: faker.date.birthdate(),
    password: faker.internet.password(),
    profile_picture: null,
    address: faker.location.streetAddress(),
  });
}

module.exports = users;
