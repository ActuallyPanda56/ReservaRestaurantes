import React from 'react';
import { GoLocation } from 'react-icons/go';

import Carousel from '@/components/common/Carousel';
import personaImage from '@/image/cui.jpg';
import restauranteImage from '@/image/cuychiquito.jpg';

import { Restaurant } from '@/components/constants/interfaces';
import Navbar from './components/Navbar';
import Reservation from './components/Reservation';
import Image from 'next/image';
import Footer from './components/Footer';

export default function HomeView() {
  const restaurants: Restaurant[] = [
    {
      title: 'Cuy Chiquito',
      description:
        'El mejor cuy de la ciudad para ti y tu familia en Cuy Chiquito Restaurant & Bar. Disfruta de una experiencia gastronómica única con nuestro cuy preparado a la perfección, acompañado de guarniciones frescas y bebidas selectas. Nuestro ambiente acogedor y servicio excepcional harán que tu visita sea inolvidable.',
      image: restauranteImage,
    },
    {
      title: 'Cuy Grande',
      description:
        'El cuy más grande de la ciudad para ti y tu familia en Cuy Chiquito Restaurant & Bar. Nuestro cuy grande es ideal para compartir en reuniones familiares o con amigos, ofreciendo una carne jugosa y tierna que deleitará a todos los comensales. Ven y vive una fiesta de sabores en un entorno agradable y familiar.',
      image: personaImage,
    },
    {
      title: 'Cuy Mediano',
      description:
        'El cuy mediano de la ciudad para ti y tu familia en Cuy Chiquito Restaurant & Bar. Perfecto para una cena íntima o una comida casual, nuestro cuy mediano está sazonado con especias locales y cocinado a la perfección. Acompaña tu plato con nuestras exclusivas bebidas artesanales para una experiencia completa.',
      image: restauranteImage,
    },
    {
      title: 'Cuy Pequeño',
      description:
        'El cuy más pequeño de la ciudad para ti y tu familia en Cuy Chiquito Restaurant & Bar. No dejes que su tamaño te engañe; nuestro cuy pequeño está lleno de sabor y es ideal para quienes desean probar algo delicioso pero ligero. Disfruta de un servicio rápido y amable en un ambiente relajado y acogedor.',
      image: personaImage,
    },
  ];

  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-1">
        <Navbar />
        <Carousel restaurants={restaurants} />
        <div className="w-full flex flex-col justify-center items-center gap-10 px-4 sm:px-6 lg:px-8">
          <div className="mt-5 w-full max-w-screen-lg">
            <Reservation />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg mt-10">
            <div className="relative flex justify-center hover:scale-105 transition-all cursor-pointer">
              <Image
                src={restaurants[0].image}
                alt={restaurants[0].title}
                width={400}
                height={400}
                className="object-cover h-full w-full rounded-lg"
              />
              <span className="text-xl text-white font-bold absolute bottom-10">
                {restaurants[0].title}
              </span>
            </div>
            {restaurants.slice(1, 3).map((restaurant, index) => (
              <div
                key={index}
                className="relative flex justify-center hover:scale-105 transition-all cursor-pointer"
              >
                <Image
                  src={restaurant.image}
                  alt={restaurant.title}
                  width={400}
                  height={400}
                  className="object-cover h-full w-full aspect-square rounded-lg"
                />
                <span className="text-xl text-white font-bold absolute bottom-10">
                  {restaurant.title}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-6 w-full max-w-screen-lg px-4">
            <h3 className="text-gray-800 text-xl">Special Offers</h3>
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <span className="text-2xl lg:text-3xl font-semibold">
                Best offers of the month
              </span>
              <button className="btn-primary mt-4 sm:mt-0">View all</button>
            </div>
            <div className="flex flex-col">
              <p className="max-w-full lg:max-w-[600px]">
                Experience fantastic benefits and obtain better rates when you
                make a direct booking on our official website.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 px-4 w-full max-w-screen-lg">
            {restaurants.slice(0, 3).map((restaurant) => (
              <div
                key={restaurant.title}
                className="flex flex-col gap-3 p-5 rounded-lg shadow-md w-full sm:w-[300px] h-[500px] relative cursor-pointer hover:scale-105 transition-all"
              >
                <Image
                  src={restaurant.image}
                  alt={restaurant.title}
                  width={300}
                  height={300}
                  className="object-cover h-[200px] w-full rounded-lg"
                />
                <div className="flex flex-col gap-2 h-[280px] overflow-hidden">
                  <span className="text-xl font-semibold">
                    {restaurant.title}
                  </span>
                  <span className="text-gray-600 line-clamp-6">
                    {restaurant.description}
                  </span>
                  <div className="flex items-center gap-2 absolute bottom-4 right-4">
                    <GoLocation />
                    <span>Location</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
