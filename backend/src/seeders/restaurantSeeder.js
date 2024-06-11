const restaurants = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    user_id: '7285999e-0501-4837-9abf-6ef48cac512f',
    name: 'The Gourmet Kitchen',
    description: 'A fine dining experience with a blend of world cuisines.',
    banner: 'https://example.com/banners/gourmet-kitchen.jpg',
    pictures: JSON.stringify([
      'https://example.com/images/gourmet-kitchen1.jpg',
      'https://example.com/images/gourmet-kitchen2.jpg'
    ]),
    menu: JSON.stringify([
      {item: 'Seared Scallops', price: 25.99},
      {item: 'Filet Mignon', price: 39.99}
    ]),
    type: 'Fine Dining',
    address: '1234 Culinary Road',
    rating: 5,
    capacity: 50,
    age_restricted: false
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    user_id: '8a7434c2-3e22-4f18-b9de-43fbec61b409',
    name: 'Burger Haven',
    description: 'The best burgers in town with a variety of toppings.',
    banner: 'https://example.com/banners/burger-haven.jpg',
    pictures: JSON.stringify([
      'https://example.com/images/burger-haven1.jpg',
      'https://example.com/images/burger-haven2.jpg'
    ]),
    menu: JSON.stringify([
      {item: 'Classic Cheeseburger', price: 9.99},
      {item: 'Bacon Double Cheeseburger', price: 12.99}
    ]),
    type: 'Fast Food',
    address: '5678 Burger Lane',
    rating: 4,
    capacity: 100,
    age_restricted: false
  },
  {
    id: '323e4567-e89b-12d3-a456-426614174002',
    user_id: 'b3c10c6a-7b0f-4cfa-8d6f-cdba52b9c8c9',
    name: 'Pasta Palace',
    description: 'Authentic Italian pasta dishes in a cozy setting.',
    banner: 'https://example.com/banners/pasta-palace.jpg',
    pictures: JSON.stringify([
      'https://example.com/images/pasta-palace1.jpg',
      'https://example.com/images/pasta-palace2.jpg'
    ]),
    menu: JSON.stringify([
      {item: 'Spaghetti Carbonara', price: 15.99},
      {item: 'Lasagna', price: 17.99}
    ]),
    type: 'Italian',
    address: '9101 Pasta Place',
    rating: 4,
    capacity: 60,
    age_restricted: false
  },
  {
    id: '423e4567-e89b-12d3-a456-426614174003',
    user_id: 'eab8b6d5-f8f1-41f9-8c92-d3f1f8a5f8b9',
    name: 'Sushi Central',
    description: 'Fresh sushi and sashimi made to order.',
    banner: 'https://example.com/banners/sushi-central.jpg',
    pictures: JSON.stringify([
      'https://example.com/images/sushi-central1.jpg',
      'https://example.com/images/sushi-central2.jpg'
    ]),
    menu: JSON.stringify([
      {item: 'California Roll', price: 8.99},
      {item: 'Sashimi Platter', price: 22.99}
    ]),
    type: 'Japanese',
    address: '2468 Sushi Street',
    rating: 5,
    capacity: 40,
    age_restricted: false
  },
  {
    id: '523e4567-e89b-12d3-a456-426614174004',
    user_id: 'a3f6c1d2-6c5e-4e8a-bf6c-70bf1a9f1a3f',
    name: 'Taco Fiesta',
    description: 'A vibrant spot for tacos and margaritas.',
    banner: 'https://example.com/banners/taco-fiesta.jpg',
    pictures: JSON.stringify([
      'https://example.com/images/taco-fiesta1.jpg',
      'https://example.com/images/taco-fiesta2.jpg'
    ]),
    menu: JSON.stringify([
      {item: 'Chicken Tacos', price: 7.99},
      {item: 'Beef Tacos', price: 8.99}
    ]),
    type: 'Mexican',
    address: '1357 Fiesta Avenue',
    rating: 4,
    capacity: 80,
    age_restricted: false
  }
];

module.exports = restaurants;