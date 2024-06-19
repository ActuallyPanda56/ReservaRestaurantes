'use client';

import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Restaurant } from '../constants/interfaces';
import Image from 'next/image';

export default function Carousel({
  restaurants = [],
}: {
  restaurants: Restaurant[];
}) {
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-8 bg-orange-400 text-2xl rounded-full z-30 h-10 w-10 flex justify-center items-center cursor-pointer"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="absolute top-1/2  left-8 bg-orange-400 p-2 rounded-full z-30 h-10 w-10 flex justify-center items-center cursor-pointer"
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-screen h-[800px] relative">
      <Slider {...settings}>
        {restaurants.map((restaurant) => (
          <Image
            src={restaurant.image}
            alt={restaurant.title}
            width={400}
            height={400}
            key={restaurant.title}
            className="object-cover h-[750px] w-full"
          />
        ))}
      </Slider>
    </div>
  );
}
