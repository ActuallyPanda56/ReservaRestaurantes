import React from 'react';
import { GoLocation } from 'react-icons/go';

import Carousel from '@/components/common/Carousel.tsx';
import personaImage from '@/image/cui.jpg';
import restauranteImage from '@/image/cuychiquito.jpg';

import Login from './components/Login';

export default function HomeView() {
  const images = [personaImage, restauranteImage]; // Crea un array con las imágenes
  return (
    <main>
      <div className="flex flex-col gap-20 w-screen relative">
        <div className="flex justify-between h-screen w-screen px-20 pt-20 relative z-10">
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
            <Carousel images={images} />
            <button className="btn-primary mt-4 absolute center-0 bottom-0">
              Ver más
            </button>
            {/* Botón "Ver más" */}
          </div>
          <Login />
        </div>
        <div className="w-screen h-[320px] absolute top-0 left-0 bg-[--foreground] -z-10" />
      </div>
    </main>
  );
}
