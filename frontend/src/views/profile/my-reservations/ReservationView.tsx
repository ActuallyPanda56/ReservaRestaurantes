'use client';

import BasicTable from '@/components/common/table/BasicTable';
import { HttpMethods } from '@/components/constants/enums';
import { userStore } from '@/store/user';
import axiosRequest from '@/utils/axiosRequest';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function ReservationView() {
  const userData = userStore((state: any) => state.user);
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [prevBookingData, setPrevBookingData] = useState<any[]>([]);

  let bookings: any[] = [];
  let prevBookings: any[] = [];

  const checkDate = (date: string) => {
    const currentDate = new Date();
    const bookingDate = new Date(date);
    return currentDate < bookingDate;
  };

  console.log('Booking data:', bookingData);
  console.log('Prev booking data:', prevBookingData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosRequest(
        HttpMethods.GET,
        `/booking/user/${userData.id}`
      );

      bookings = response.data.bookings
        .filter((booking: any) => checkDate(booking.date))
        .map((booking: any) => ({
          id: booking.id,
          name: booking.bearer_name,
          place: booking.restaurant_address,
          date: booking.date.split('T')[0],
          restaurant: booking.restaurant_name,
        }))
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        });

      prevBookings = response.data.bookings
        .filter((booking: any) => !checkDate(booking.date))
        .map((booking: any) => ({
          id: booking.id,
          name: booking.bearer_name,
          place: booking.restaurant_address,
          date: booking.date.split('T')[0],
          restaurant: booking.restaurant_name,
        }))
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
        });

      setBookingData(bookings);
      setPrevBookingData(prevBookings);
    };
    fetchData();
  }, [userData]);

  const handleDelete = async (id: string) => {
    const response = await axiosRequest(HttpMethods.DELETE, `/booking/${id}`);
    if (response.status === 200) {
      setBookingData(bookingData.filter((booking) => booking.id !== id));
      setPrevBookingData(
        prevBookingData.filter((booking) => booking.id !== id)
      );
    }
  };

  return (
    <>
      <div className="flex flex-col my-20 mx-20 pr-40 gap-20 w-full">
        <div className="flex flex-col gap-3">
          <div className="w-full flex justify-between items-end">
            <h1 className="text-5xl font-bold">Mis Reservaciones</h1>
          </div>
          <p className="text-lg text-gray-600 pr-10">
            Aquí se muestran tus reservaciones a restaurantes. Puedes ver las
            que están pendientes y las que ya han pasado.
          </p>
          {userData.isRestaurantOwner && (
            <div className="text-lg text-gray-600 pr-10 flex gap-1">
              <p>Si quieres ver la información de tu restaurante, haz click</p>
              <Link
                href="/profile/control-panel"
                className="text-orange-500 underline hover:text-orange-600"
              >
                aquí
              </Link>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between items-end">
          <h1 className="text-3xl font-bold">Reservaciones pendientes</h1>
        </div>
        <div className="shadow-lg">
          <BasicTable
            headers={['Nombre', 'Lugar', 'Fecha', 'Restaurante']}
            rows={bookingData}
            remove
            removeFunction={handleDelete}
          />
        </div>
        <div className="w-full flex justify-between items-end">
          <h1 className="text-3xl font-bold">Reservaciones anteriores</h1>
        </div>
        <div className="flex shadow-lg">
          <BasicTable
            headers={['Nombre', 'Lugar', 'Fecha', 'Restaurante']}
            rows={prevBookingData}
            remove
            removeFunction={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
