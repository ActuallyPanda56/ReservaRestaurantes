'use client';

import RestaurantCard from '@/components/common/RestaurantCard';
import { RestaurantData } from '@/components/constants/interfaces';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function RestaurantsView() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);

  useEffect(() => {
    // fetch restaurants
    try {
      axios.get('http://localhost:8081/v1/restaurant/').then((response) => {
        setRestaurants(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen p-5 gap-5">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">
            Todos los restaurantes ({restaurants.length})
          </h2>
          <p className="tracking-tight text-gray-600 italic text-sm">
            Aquí podrás ver todos los restaurantes disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              id={restaurant.id}
              key={restaurant.id}
              name={restaurant.name}
              description={restaurant.short_description || 'No hay descripción'}
              image={restaurant.banner || 'https://via.placeholder.com/150'}
              rating={restaurant.rating}
              age_restricted={restaurant.age_restricted}
            />
          ))}
        </div>
      </div>
    </>
  );
}
