'use client';

import BasicTable from '@/components/common/table/BasicTable';
import { RestaurantData } from '@/components/constants/interfaces';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function RestaurantDetailView() {
  const [restaurant, setRestaurant] = useState<RestaurantData>();
  const params = useParams();
  const { restaurantId } = params;

  useEffect(() => {
    // fetch restaurant
    try {
      axios
        .get(`http://localhost:8081/v1/restaurant/${restaurantId}`)
        .then((response) => {
          setRestaurant(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const tableHeaders = ['propiedad', 'valor']
  const tableRows = [{ propiedad: 'Rating', valor: restaurant?.rating || 'No hay datos' }, { propiedad: 'Edad restringida', valor: restaurant?.age_restricted ? 'Sí' : 'No'}, { propiedad: 'Dirección', valor: restaurant?.address || 'No hay datos'}, { propiedad: 'Teléfono', valor: restaurant?.phone_number?.join(', ') || 'No hay datos'}, { propiedad: 'Email', valor: restaurant?.email || 'No hay datos'}, { propiedad: 'Horario', valor: restaurant?.schedule || 'No hay datos'}, { propiedad: 'Tipo', valor: restaurant?.type || 'No hay datos'}, { propiedad: 'Menú', valor: restaurant?.menuInfo?.join(', ') || 'No hay datos'}, { propiedad: 'Reservaciones', valor: restaurant?.reservations?.length || 'No hay datos'}]

  return (
    <>
      <div className="w-screen flex flex-col">
        <picture className='bg-black'>
          <img
            src={restaurant?.banner}
            alt={restaurant?.name}
            className="object-cover w-full h-[300px] opacity-40"
          />
        </picture>
        <div className='flex flex-col p-10 gap-10'>
          <div className='flex flex-col'>
            <h1 className="text-5xl font-bold">{restaurant?.name}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: restaurant?.description || 'No hay descripción',
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold'>Sobre {restaurant?.name}</h3>
            <BasicTable headers={tableHeaders} rows={tableRows}/>
          </div>
        </div>
      </div>
    </>
  );
}
