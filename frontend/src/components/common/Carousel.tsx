'use client';

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RestaurantData } from '../constants/interfaces';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function Carousel({
  restaurants = [],
}: {
  restaurants: RestaurantData[];
}) {
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-8 bg-white border-4 border-gray-400 p-2 rounded-full z-30 h-10 w-10 flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        <FaAngleRight className="text-black" />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="absolute top-1/2 left-8 bg-white border-4 border-gray-400 p-2 rounded-full z-30 h-10 w-10 flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        <FaAngleLeft className="text-black" />
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-screen h-[500px] relative">
      <Slider {...settings}>
        {restaurants.map((restaurant) => (
          <img
            src={restaurant.banner}
            alt={restaurant.name}
            width={400}
            height={400}
            key={restaurant.name}
            className="object-cover h-[400px] w-full"
          />
        ))}
      </Slider>
    </div>
  );
}
