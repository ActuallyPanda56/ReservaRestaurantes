const reviews = [
  {
    id: '1a2b3c4d-5e6f-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: '7285999e-0501-4837-9abf-6ef48cac512f',
    restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 5,
    title: 'Amazing Experience!',
    description: 'The food was incredible and the service was top-notch.'
  },
  {
    id: '2b3c4d5e-6f7a-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: '8a7434c2-3e22-4f18-b9de-43fbec61b409',
    restaurant_id: '223e4567-e89b-12d3-a456-426614174001',
    rating: 4,
    title: 'Great Burgers',
    description: 'Loved the variety of toppings available for the burgers.'
  },
  {
    id: '3c4d5e6f-7a8b-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'b3c10c6a-7b0f-4cfa-8d6f-cdba52b9c8c9',
    restaurant_id: '323e4567-e89b-12d3-a456-426614174002',
    rating: 5,
    title: 'Authentic Italian',
    description: 'The pasta dishes are just like in Italy!'
  },
  {
    id: '4d5e6f7a-8b9c-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'eab8b6d5-f8f1-41f9-8c92-d3f1f8a5f8b9',
    restaurant_id: '423e4567-e89b-12d3-a456-426614174003',
    rating: 4,
    title: 'Fresh Sushi',
    description: 'The sushi is always fresh and delicious.'
  },
  {
    id: '5e6f7a8b-9c0d-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'a3f6c1d2-6c5e-4e8a-bf6c-70bf1a9f1a3f',
    restaurant_id: '523e4567-e89b-12d3-a456-426614174004',
    rating: 3,
    title: 'Fun Atmosphere',
    description: 'Great place for a night out with friends, but the tacos could be better.'
  },
  {
    id: '6f7a8b9c-0d1e-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'd4e5f6a7-8b9c-4d3e-8f9d-b0a5c8e9a7b0',
    restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 5,
    title: 'Perfect Dinner',
    description: 'Had a wonderful dinner with amazing service.'
  },
  {
    id: '7a8b9c0d-1e2f-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'a1b2c3d4-e5f6-4a7b-8c9d-b0a5c8e9a7b1',
    restaurant_id: '223e4567-e89b-12d3-a456-426614174001',
    rating: 4,
    title: 'Tasty Burgers',
    description: 'Enjoyed the food, especially the burgers!'
  },
  {
    id: '8b9c0d1e-2f3g-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b2',
    restaurant_id: '323e4567-e89b-12d3-a456-426614174002',
    rating: 5,
    title: 'Italian Delights',
    description: 'The lasagna was out of this world.'
  },
  {
    id: '9c0d1e2f-3g4h-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'e1d2c3b4-a5f6-4a7b-8c9d-b0a5c8e9a7b3',
    restaurant_id: '423e4567-e89b-12d3-a456-426614174003',
    rating: 5,
    title: 'Best Sushi',
    description: 'A great place for sushi lovers.'
  },
  {
    id: '0d1e2f3g-4h5i-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'a2b3c4d5-e6f7-4a7b-8c9d-b0a5c8e9a7b4',
    restaurant_id: '523e4567-e89b-12d3-a456-426614174004',
    rating: 3,
    title: 'Good but not Great',
    description: 'The atmosphere is fun, but the food could be better.'
  },
  {
    id: '1e2f3g4h-5i6j-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'b1c2d3e4-f5a6-4a7b-8c9d-b0a5c8e9a7b5',
    restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 4,
    title: 'Great Food',
    description: 'Really enjoyed the food and the ambiance.'
  },
  {
    id: '2f3g4h5i-6j7k-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'c1d2e3f4-a5b6-4a7b-8c9d-b0a5c8e9a7b6',
    restaurant_id: '223e4567-e89b-12d3-a456-426614174001',
    rating: 4,
    title: 'Burger Paradise',
    description: 'A must-visit for burger enthusiasts.'
  },
  {
    id: '3g4h5i6j-7k8l-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'd1e2f3a4-b5c6-4a7b-8c9d-b0a5c8e9a7b7',
    restaurant_id: '323e4567-e89b-12d3-a456-426614174002',
    rating: 5,
    title: 'Italian Heaven',
    description: 'The pasta dishes are a dream come true.'
  },
  {
    id: '4h5i6j7k-8l9m-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'e1f2a3b4-c5d6-4a7b-8c9d-b0a5c8e9a7b8',
    restaurant_id: '423e4567-e89b-12d3-a456-426614174003',
    rating: 5,
    title: 'Fresh and Tasty',
    description: 'The best sushi I have ever had.'
  },
  {
    id: '5i6j7k8l-9m0n-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '523e4567-e89b-12d3-a456-426614174004',
    rating: 3,
    title: 'Fun Night Out',
    description: 'Great for a night out with friends, but the food was average.'
  },
  {
    id: '6j7k8l9m-0n1o-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 5,
    title: 'Delicious',
    description: 'The food and service were outstanding.'
  },
  {
    id: '7k8l9m0n-1o2p-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '223e4567-e89b-12d3-a456-426614174001',
    rating: 4,
    title: 'Yummy Burgers',
    description: 'Really enjoyed the burger selection.'
  },
  {
    id: '8l9m0n1o-2p3q-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '323e4567-e89b-12d3-a456-426614174002',
    rating: 5,
    title: 'Fantastic Pasta',
    description: 'The best Italian food in town.'
  },
  {
    id: '9m0n1o2p-3q4r-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '423e4567-e89b-12d3-a456-426614174003',
    rating: 5,
    title: 'Sushi Love',
    description: 'Fresh and tasty sushi every time.'
  },
  {
    id: '0n1o2p3q-4r5s-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '523e4567-e89b-12d3-a456-426614174004',
    rating: 3,
    title: 'Good Vibes',
    description: 'A fun place to hang out, but the food was just okay.'
  },
  {
    id: '1o2p3q4r-5s6t-4a7b-8c9d-0a1b2c3d4e5f',
    user_id: 'f1a2b3c4-d5e6-4a7b-8c9d-b0a5c8e9a7b9',
    restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
    rating: 5,
    title: 'Highly Recommended',
    description: 'Everything was perfect, from the food to the service.'
  }
];

module.exports = reviews;