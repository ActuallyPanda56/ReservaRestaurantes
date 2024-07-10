const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');

const schedules = [];

const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

for (let i = 0; i < 80; i++) {
  schedules.push({
    id: uuidv4(),
    restaurant_id: '', // Will be populated later
    day: days[Math.floor(Math.random() * days.length)],
    start_time: `${faker.number.int({ min: 0, max: 5 })}:${faker.number.int({ min: 0, max: 59 })}`,
    end_time: `${faker.number.int({ min: 16, max: 23 })}:${faker.number.int({ min: 0, max: 59 })}`,
  });
}

module.exports = schedules;
