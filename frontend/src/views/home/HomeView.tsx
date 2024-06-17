import React from 'react';
import { GoLocation } from 'react-icons/go';

import Carousel from '@/components/common/Carousel';
import personaImage from '@/image/cui.jpg';
import restauranteImage from '@/image/cuychiquito.jpg';

import { Restaurant } from '@/components/constants/interfaces';
import LoginCard from './components/LoginCard';

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
      <div className="flex flex-col gap-20 w-screen items-center relative">
        <div className="flex gap-6 justify-between h-screen w-screen px-20 pt-20 relative z-10 container">
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-5">
              <span className="text-5xl font-semibold text-white">
                Busca los restaurantes que estén a tu alrededor
              </span>
              <form className="flex items-center w-[600px] gap-2 px-2 bg-white rounded shadow-lg shadow-[--shadow]">
                <GoLocation className="text-2xl mx-2" />
                <input
                  type="text"
                  placeholder="Ingresa la dirección de tu casa"
                  className="py-4"
                />
                <button className="btn-primary mx-2">Enviar</button>
              </form>
            </div>
            <Carousel restaurants={restaurants} />
            <button className="btn-primary mt-4 absolute center-0 bottom-0">
              Ver más
            </button>
            {/* Botón "Ver más" */}
          </div>
          <LoginCard />
        </div>
        <div className="w-screen h-[320px] absolute top-0 left-0 bg-[--foreground] -z-10" />
      </div>
    </main>
  );
}
