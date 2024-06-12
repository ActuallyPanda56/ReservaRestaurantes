// @ts-nocheck
'use client';

import React, { useState } from 'react'; // Importa useState desde React
import { GoLocation } from 'react-icons/go';
import { FaReact, FaHeart } from 'react-icons/fa'; // Importa los iconos de react-icons
import Login from './components/Login';

// Importa las imágenes
import Image from 'next/image';
import personaImage from '@/image/cui.jpg'; // Ruta a tu imagen
import restauranteImage from '@/image/cuychiquito.jpg'; // Ruta a tu imagen

export default function HomeView() {

  const images = [
    personaImage,
    restauranteImage,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

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
                <button className="btn-primary">Enviar</button>
              </form>
            </div>
            <div className="relative w-full flex justify-center"> {/* Centra la imagen */}
              <div className="w-[400px] h-[300px]"> {/* Tamaño mediano */}
                <Image src={images[currentImageIndex]} alt="Slide" layout="fill" objectFit="contain" />
              </div>
              <button className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white p-2 rounded-full" onClick={goToPrevSlide}>{'<'}</button>
              <button className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white p-2 rounded-full" onClick={goToNextSlide}>{'>'}</button>
            </div>
          </div>
          <Login />
        </div>

        <div>
          <span>Slider</span>
        </div>
        <div className="w-screen h-[320px] absolute top-0 left-0 bg-[--foreground] -z-10" />
      </div>
    </main>
  );
}
