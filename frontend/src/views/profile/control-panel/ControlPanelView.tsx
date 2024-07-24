'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCaretDown } from 'react-icons/fa6';
import { userStore } from '@/store/user';
import { RestaurantData } from '@/components/constants/interfaces';
import axios from 'axios';

export default function ControlPanelView() {
  const [openRestaurantIndex, setOpenRestaurantIndex] = useState<null | number>(
    null
  );
  const [restaurantData, setRestaurantData] = useState<RestaurantData[]>([]);

  const userId = userStore((state: any) => state.user?.id);

  const getRestaurants = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8081/v1/restaurant/user/${userId}`
      );
      if (!data || data.length === 0) {
        return;
      }
      setRestaurantData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRestaurant = (index: number) => {
    setOpenRestaurantIndex(openRestaurantIndex === index ? null : index);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="flex flex-col my-20 mx-20 pr-20 gap-20 w-full">
      <div className="w-full flex flex-col">
        <h1 className="text-5xl font-bold gap-10">Panel de Control</h1>
        <div className="flex items-center gap-1 text-lg">
          <p className="text-gray-600">
            Aquí puedes ver y manejar el estado de tu restaurante. Para ver tu
            perfil de usuario, haz click
          </p>
          <Link
            href="/profile"
            className="text-orange-500 underline hover:text-orange-600"
          >
            aquí
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-end">
          <h1 className="text-3xl font-bold">Tus Restaurantes</h1>
        </div>
        <p className="text-gray-600">
          Aquí puedes ver la información general de tus restaurantes. Para más
          información, haz click en el botón "Ver más".
        </p>
      </div>
      <div className="flex flex-col gap-10 mr-20 -mt-12">
        {restaurantData.length !== 0 &&
          restaurantData.map((restaurant, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md ">
                <div
                  className="flex justify-between items-center h-full p-5 cursor-pointer"
                  onClick={() => toggleRestaurant(index)}
                >
                  <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <p>
                      {restaurant.schedule && restaurant.schedule.length > 0
                        ? JSON.stringify(restaurant.schedule)
                        : 'Horario no disponible'}
                    </p>
                    <FaCaretDown
                      className={`text-xl ${
                        openRestaurantIndex === index && 'rotate-180'
                      } transition-all`}
                    />
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openRestaurantIndex === index ? 'auto' : 0,
                    opacity: openRestaurantIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  {openRestaurantIndex === index && (
                    <>
                      <div className="flex flex-col gap-1 px-3">
                        <div className="flex items-center gap-1 text-gray-500">
                          <span>Dirección:</span>
                          <p>{restaurant.address ?? 'No hay direcciones'}</p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <span>Números de teléfono:</span>
                          <p>
                            {restaurant.phone_number
                              ? restaurant.phone_number.map(
                                  (phone_number, phoneIndex) => (
                                    <span key={phoneIndex}>
                                      {phone_number},{' '}
                                    </span>
                                  )
                                )
                              : 'No hay números de teléfono'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-5 mt-4 px-5 pb-3">
                        <h3 className="text-xl font-semibold">Reservaciones</h3>
                        <div className="flex flex-col gap-5">
                          {restaurant.reservations ? (
                            restaurant.reservations.map(
                              (reservation, resIndex) => (
                                <div
                                  key={resIndex}
                                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                                >
                                  <div className="flex flex-col gap-1">
                                    <p className="text-gray-500">
                                      {reservation.date} - {reservation.time}
                                    </p>
                                    <p className="text-gray-500">
                                      Mesa: {reservation.table}
                                    </p>
                                    <p className="text-gray-500">
                                      Cliente: {reservation.customer}
                                    </p>
                                  </div>
                                  <p className="text-gray-500">
                                    {reservation.status}
                                  </p>
                                </div>
                              )
                            )
                          ) : (
                            <p className="text-gray-500">
                              No hay reservaciones
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
              {openRestaurantIndex === index && (
                <div className="flex justify-end">
                  <button className="btn-primary rounded-lg w-[120px]">
                    Ver más
                  </button>
                </div>
              )}
            </div>
          ))}
        {restaurantData.length === 0 && (
          <div className="flex justify-center items-center h-[200px] w-full bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No tienes restaurantes registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
