'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Restaurant } from '../constants/interfaces';

export default function Carousel({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === restaurants.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? restaurants.length - 1 : prevIndex - 1
    );
  };

  // Automatically change images every 10 seconds
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 10000);
    return () => {
      clearInterval(interval);
    }; // Clear interval when component unmounts
  }, [currentImageIndex]);

  return (
    <div className="relative w-full max-w-[800px] flex flex-col items-center">
      <div className="overflow-hidden w-full h-[450px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex w-full shrink-0 items-center"
              style={{ minWidth: '100%' }}
            >
              <Image
                src={restaurant.image}
                alt="Slide"
                className="object-cover w-1/2 h-full"
              />
              <div className="w-1/2 h-full flex flex-col gap-5 items-center pt-10 px-10 bg-[--foreground] text-white">
                <span className="text-2xl">{restaurant.title}</span>
                <span className="italic ">{restaurant.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-orange-400 text-white flex justify-center rounded-full text-3xl"
        onClick={goToPrevSlide}
      >
        <FaAngleLeft />
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-orange-400 flex text-white justify-center rounded-full text-3xl"
        onClick={goToNextSlide}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
