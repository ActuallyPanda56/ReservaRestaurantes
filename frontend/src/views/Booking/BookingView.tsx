'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RestaurantData } from '@/components/constants/interfaces';
import cui from '@/image/cui.jpg';
import Link from 'next/link';
import BookingForm from './components/BookingForm';
import { userStore } from '@/store/user';
import useBookingForm from './hooks/useBookingForm';
import { FormikProvider } from 'formik';

export default function BookingView() {
  const [restaurant, setRestaurant] = useState<RestaurantData>();
  const params = useParams();
  const { restaurantId } = params;

  const formik = useBookingForm();
  const { setFieldValue } = formik;

  const userData = userStore((state: any) => state.user);

  useEffect(() => {
    // fetch restaurant
    try {
      axios
        .get(`http://localhost:8081/v1/restaurant/id/${restaurantId}`)
        .then((response) => {
          const data = response.data;

          // Parse JSON fields
          data.pictures = JSON.parse(data.pictures);
          data.menu_info = JSON.parse(data.menu_info);
          data.phone_number = JSON.parse(data.phone_number);
          data.capacity = JSON.parse(data.capacity);

          setRestaurant(data);
        });

      setFieldValue('restaurantId', restaurantId);
    } catch (error) {
      console.log(error);
    }
  }, [userData]);

  return (
    <>
      <FormikProvider value={formik}>
        <div className="w-screen flex flex-col items-center relative">
          <Link
            href={`/restaurants/${restaurantId}`}
            className="absolute top-5 left-5 bg-[#333] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#444] transition-all z-10"
          >
            Volver
          </Link>
          <picture className="bg-black w-full">
            <img
              src={restaurant?.banner}
              alt={restaurant?.name}
              className="object-cover w-full h-[300px] opacity-40"
            />
          </picture>

          <div className="flex gap-2">
            {/* SIDEBAR */}
            <div className="flex flex-col border-r-2 border-[--foreground] max-w-[400px]">
              <picture className="bg-white">
                <img
                  src={restaurant?.pictures[0] || '/logo.svg'}
                  alt="LOGO"
                  className="object-cover aspect-square opacity-80"
                />
              </picture>
              <div className="flex flex-col p-4">
                <h2 className="text-2xl font-bold">Contacto</h2>
                <p className="text-sm text-gray-600 italic">
                  Información básica de contacto.
                </p>
                <div>
                  <h3 className="text-lg font-bold">Teléfono(s)</h3>
                  <p className="italic text-gray-600">
                    {Array.isArray(restaurant?.phone_number)
                      ? restaurant.phone_number.join(', ')
                      : 'Sin número de teléfono'}
                  </p>
                  <h3 className="text-lg font-bold">Dirección</h3>
                  <p className="italic text-gray-600">
                    {restaurant?.address || 'Sin dirección'}
                  </p>
                </div>
                <h2 className="text-2xl font-bold mt-2">Horario</h2>
                {restaurant?.schedule?.map((item, index) => (
                  <div key={item.day + index}>
                    <h3 className="font-semibold">{item.day}</h3>
                    <p className="italic text-gray-600">
                      {item.start_time} - {item.end_time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-col p-10 gap-10 container w-full items-center">
              <h2 className="text-4xl font-bold">
                Haz tu reservación en {restaurant?.name} ahora!!
              </h2>
              <BookingForm
                userData={userData}
                ageRestricted={restaurant?.age_restricted}
              />
            </div>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}
