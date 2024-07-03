"use client"

import React from 'react';
import { RestaurantCardProps } from '../constants/interfaces';
import { useRouter } from 'next/navigation';

export default function RestaurantCard({
  id,
  name,
  description,
  image,
  rating,
  age_restricted,
}: RestaurantCardProps) {
    const router = useRouter();
  return (
    <div className="max-w-sm mx-auto w-full h-[400px] bg-white rounded-xl pb-10 shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-all relative" onClick={()=>{
        router.push(`/restaurants/${id}`)
    }}>
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={typeof image === 'string' ? image : image.src}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        <p className="mt-2 text-gray-600 text-sm line-clamp-5">{description}</p>
      </div>
      <div className="flex justify-between absolute bottom-4 left-4">
        <span className="text-sm text-gray-600 italic">rating: {rating}/5</span>
      </div>
      {age_restricted ? (
        <div className="absolute top-2 left-2 rounded-full bg-red-600 border-2 border-white flex items-center justify-center py-1 px-2">
          <span className="font-bold text-white text-sm">+18</span>
        </div>
      ) : null}
    </div>
  );
}
