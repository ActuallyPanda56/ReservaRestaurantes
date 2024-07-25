'use client';

import BasicTable from '@/components/common/table/BasicTable';
import { RestaurantData } from '@/components/constants/interfaces';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import cui from '@/image/cui.jpg';
import Link from 'next/link';

export default function RestaurantDetailView() {
  const [restaurant, setRestaurant] = useState<RestaurantData>();
  const params = useParams();
  const { restaurantId } = params;

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
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const tableHeaders = ['propiedad', 'valor'];
  const tableRows = [
    { propiedad: 'Rating', valor: restaurant?.rating || 'No hay datos' },
    {
      propiedad: 'Edad restringida',
      valor: restaurant?.age_restricted ? 'Sí' : 'No',
    },
    { propiedad: 'Dirección', valor: restaurant?.address || 'No hay datos' },
    {
      propiedad: 'Teléfono(s)',
      valor: Array.isArray(restaurant?.phone_number)
        ? restaurant.phone_number.join(', ')
        : 'No hay datos',
    },
    {
      propiedad: 'Horario',
      valor: Array.isArray(restaurant?.schedule)
        ? restaurant.schedule.map((item) => `${item.day}`).join(', ')
        : 'No hay datos',
    },
    { propiedad: 'Tipo', valor: restaurant?.type || 'No hay datos' },
    {
      propiedad: 'Menú',
      valor: Array.isArray(restaurant?.menu_info)
        ? restaurant.menu_info
            .map((item) => `${item.name}: ${item.description} - $${item.price}`)
            .join(', ')
        : 'No hay datos',
    },
    {
      propiedad: 'Reservaciones',
      valor: Array.isArray(restaurant?.bookings)
        ? restaurant.bookings.length
        : 'No hay datos',
    },
  ];

  return (
    <>
      <div className="w-screen flex flex-col items-center relative">
        <Link
          href="/restaurants"
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
          <div className="flex flex-col p-10 gap-10 container">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h1 className="text-5xl font-bold">{restaurant?.name}</h1>
                <Link
                  href={`/booking/${restaurantId}`}
                  className="btn-primary hover:scale-105 cursor-pointer rounded-lg ml-4"
                >
                  Reservar
                </Link>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: restaurant?.description || 'No hay descripción',
                }}
                className="max-w-[800px] text-justify italic text-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">
                Sobre {restaurant?.name}
              </h3>
              <BasicTable headers={tableHeaders} rows={tableRows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
