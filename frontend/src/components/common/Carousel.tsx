'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCaretRight } from 'react-icons/fa';

export default function Carousel({
  images,
}: {
  images: string[] | StaticImageData[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    currentImageIndex === images.length - 1
      ? setCurrentImageIndex(0)
      : setCurrentImageIndex(currentImageIndex + 1);
  };

  const goToPrevSlide = () => {
    currentImageIndex === 0
      ? setCurrentImageIndex(images.length - 1)
      : setCurrentImageIndex(currentImageIndex - 1);
  };

  // Utiliza useEffect para cambiar las imágenes automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 4000);
    return () => {
      clearInterval(interval);
    }; // Limpia el intervalo cuando el componente se desmonta
  }, [currentImageIndex]);

  return (
    <>
      <div className="relative w-full flex flex-col items-center">
        {/* Centra la imagen y ajusta el tamaño */}
        <div className="h-[450px] w-full">
          {/* Tamaño más pequeño */}
          <Image
            src={images[currentImageIndex]}
            alt="Slide"
            className="object-cover w-full h-full"
          />
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-orange-400 p-2 rounded-full"
          onClick={goToPrevSlide}
        >
          {'<'}
        </button>
        <FaCaretRight
          className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-orange-400 text-2xl rounded-full"
          onClick={goToNextSlide}
        />
      </div>
    </>
  );
}
