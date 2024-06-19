'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { restaurantData } from '@/utils/mock/RestaurantData';
import { FaCaretDown } from 'react-icons/fa6';

export default function ControlPanelView() {
  const [openRestaurantIndex, setOpenRestaurantIndex] = useState<null | number>(
    null
  );

  const toggleRestaurant = (index: number) => {
    setOpenRestaurantIndex(openRestaurantIndex === index ? null : index);
  };

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
        {restaurantData.map((restaurant, index) => (
          <div className="flex flex-col gap-3" key={index}>
            <div className="flex flex-col gap-5 bg-white rounded-lg shadow-md ">
              <div
                className="flex justify-between items-center h-full p-5 cursor-pointer"
                onClick={() => toggleRestaurant(index)}
              >
                <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
                <div className="flex items-center gap-2 text-gray-500">
                  <p>{restaurant.schedule}</p>
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
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>Dirección:</span>
                        <p>{restaurant.address}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>Números de teléfono:</span>
                        <p>
                          {restaurant.phone.map((phone, phoneIndex) => (
                            <span key={phoneIndex}>{phone}, </span>
                          ))}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>Email:</span>
                        <p>{restaurant.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                      <h3 className="text-xl font-semibold">Reservaciones</h3>
                      <div className="flex flex-col gap-5">
                        {restaurant.reservations.map(
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
      </div>
    </div>
  );
}
