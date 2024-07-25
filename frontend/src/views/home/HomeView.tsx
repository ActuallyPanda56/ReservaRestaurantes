'use client';

import React, { useEffect, useState } from 'react';
import { GoLocation } from 'react-icons/go';

import Carousel from '@/components/common/Carousel';

import { RestaurantData } from '@/components/constants/interfaces';
import Navbar from './components/Navbar';
import Reservation from './components/Reservation';
import Footer from './components/Footer';
import RestaurantRegistration from './components/RestaurantRegistration';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [bestOffers, setBestOffers] = useState<RestaurantData[]>([]);

  const router = useRouter();

  useEffect(() => {
    // fetch restaurants
    try {
      axios
        .get('http://localhost:8081/v1/restaurant/page/1')
        .then((response) => {
          setRestaurants(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
    // fetch best offers
    try {
      axios
        .get('http://localhost:8081/v1/restaurant/by-rating')
        .then((response) => {
          setBestOffers(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-1">
        <Navbar />
        <Carousel restaurants={restaurants} />
        <div className="w-full flex flex-col justify-center items-center gap-10 px-4 sm:px-6 lg:px-8">
          <div className="mt-5 w-full max-w-screen-lg">
            <Reservation />
          </div>

          <div className="flex flex-col gap-3 mt-6 w-full max-w-screen-lg px-4">
            <h3 className="text-gray-800 text-xl">Ofertas especiales</h3>
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <span className="text-2xl lg:text-3xl font-semibold">
                Mejores ofertas del mes
              </span>
              <Link
                href="/restaurants"
                className="btn-primary mt-4 flex items-center justify-center sm:mt-0"
              >
                Ver todo
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="max-w-full lg:max-w-[600px]">
                Experimenta fantásticos beneficios y obtén mejores tarifas al
                realizar una reserva directa en nuestra página web oficial.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 px-4 w-full max-w-screen-lg">
            {bestOffers.slice(0, 3).map((restaurant, index) => (
              <div
                key={restaurant.name + index}
                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                className="flex flex-col gap-3 p-5 rounded-lg shadow-md w-full sm:w-[300px] h-[500px] relative cursor-pointer hover:scale-105 transition-all"
              >
                <img
                  src={restaurant.banner}
                  alt={restaurant.name}
                  width={300}
                  height={300}
                  className="object-cover h-[200px] w-full rounded-lg"
                />
                <div className="flex flex-col gap-2 h-[280px] overflow-hidden">
                  <span className="text-xl font-semibold">
                    {restaurant.name}
                  </span>
                  <span className="text-[--foreground] font-bold -mt-2">
                    Rating: {restaurant.rating}
                  </span>
                  <span className="text-gray-600 line-clamp-6">
                    {restaurant.description}
                  </span>
                  <div className="flex items-center gap-2 absolute bottom-4 right-4">
                    <GoLocation />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>
            ))}
            <RestaurantRegistration />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
