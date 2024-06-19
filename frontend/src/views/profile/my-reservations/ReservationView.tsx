'use client';

import BasicTable from '@/components/common/table/BasicTable';
import React from 'react';

export default function ReservationView() {
  const reservationData = [
    {
      name: 'Juan Perez',
      place: 'Mesa 1',
      date: '2021-09-20',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Maria Lopez',
      place: 'Mesa 2',
      date: '2021-09-21',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Pedro Ramirez',
      place: 'Mesa 3',
      date: '2021-09-22',
      restaurant: 'Restaurante 3',
    },
  ];
  const prevReservationData = [
    {
      name: 'Juan Perez',
      place: 'Mesa 1',
      date: '2021-09-20',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Maria Lopez',
      place: 'Mesa 2',
      date: '2021-09-21',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Pedro Ramirez',
      place: 'Mesa 3',
      date: '2021-09-22',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Ana Torres',
      place: 'Mesa 4',
      date: '2021-09-23',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Carlos Fernandez',
      place: 'Mesa 5',
      date: '2021-09-24',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Luisa Martinez',
      place: 'Mesa 6',
      date: '2021-09-25',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Diego Suarez',
      place: 'Mesa 7',
      date: '2021-09-26',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Sofia Castillo',
      place: 'Mesa 8',
      date: '2021-09-27',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Jose Gomez',
      place: 'Mesa 9',
      date: '2021-09-28',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Carla Mendoza',
      place: 'Mesa 10',
      date: '2021-09-29',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Javier Morales',
      place: 'Mesa 11',
      date: '2021-09-30',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Laura Diaz',
      place: 'Mesa 12',
      date: '2021-10-01',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Francisco Rivera',
      place: 'Mesa 13',
      date: '2021-10-02',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Paula Chavez',
      place: 'Mesa 14',
      date: '2021-10-03',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Miguel Ortiz',
      place: 'Mesa 15',
      date: '2021-10-04',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Lucia Hernandez',
      place: 'Mesa 16',
      date: '2021-10-05',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Fernando Rojas',
      place: 'Mesa 17',
      date: '2021-10-06',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Isabel Vargas',
      place: 'Mesa 18',
      date: '2021-10-07',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Ramon Santos',
      place: 'Mesa 19',
      date: '2021-10-08',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Valeria Flores',
      place: 'Mesa 20',
      date: '2021-10-09',
      restaurant: 'Restaurante 2',
    },
    {
      name: 'Esteban Castillo',
      place: 'Mesa 21',
      date: '2021-10-10',
      restaurant: 'Restaurante 3',
    },
    {
      name: 'Marta Reyes',
      place: 'Mesa 22',
      date: '2021-10-11',
      restaurant: 'Restaurante 1',
    },
    {
      name: 'Alberto Gomez',
      place: 'Mesa 23',
      date: '2021-10-12',
      restaurant: 'Restaurante 2',
    },
  ];

  const handleEdit = async (id: string) => {
    // TODO: Implement edit function in FORMIK form
  };

  const handleDelete = async (id: string) => {
    // TODO: Implement delete function in FORMIK form
  };

  return (
    <>
      <div className="flex flex-col my-20 mx-20 pr-40 gap-20 w-full">
        <div className="w-full flex justify-between items-end">
          <h1 className="text-5xl font-bold">Mis Reservaciones</h1>
        </div>
        <div className="w-full flex justify-between items-end">
          <h1 className="text-3xl font-bold">Reservaciones pendientes</h1>
        </div>
        <div className="shadow-lg">
          <BasicTable
            headers={['Nombre', 'Lugar', 'Fecha', 'Restaurante']}
            rows={reservationData}
          />
        </div>
        <div className="flex w-full justify-end">
          <button className="btn-primary rounded-lg">
            Manejar reservaciones
          </button>
        </div>
        <div className="w-full flex justify-between items-end">
          <h1 className="text-3xl font-bold">Reservaciones anteriores</h1>
        </div>
        <div className="flex shadow-lg">
          <BasicTable
            headers={['Nombre', 'Lugar', 'Fecha', 'Restaurante']}
            rows={prevReservationData}
          />
        </div>
      </div>
    </>
  );
}
