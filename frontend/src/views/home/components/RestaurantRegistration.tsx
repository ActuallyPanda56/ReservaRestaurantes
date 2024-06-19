import Image from 'next/image';
import React from 'react';
import cui from '@/image/cui.jpg';
import Link from 'next/link';

export default function RestaurantRegistration() {
  return (
    <>
      <div className="flex flex-col w-full gap-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-5xl font-bold">
            ¿Quieres registrar tu restaurante?
          </h2>
          <p className="text-xl text-gray-600">
            ¡Únete a nuestra plataforma y promociona tu restaurante! Llega a más
            clientes y haz crecer tu negocio.
          </p>
        </div>
        <Link
          href="/auth/restaurants"
          className="w-full aspect-video rounded-xl shadow-xl bg-red-300 relative hover:scale-105 transition-all cursor-pointer"
        >
          <Image
            src={cui}
            alt="Restaurant Registration"
            width={400}
            height={400}
            className="object-cover aspect-video h-full w-full rounded-lg"
          />
          <span className="text-3xl text-white font-bold absolute bottom-10 left-10">
            Registra tu restaurante aquí
          </span>
        </Link>
      </div>
    </>
  );
}
