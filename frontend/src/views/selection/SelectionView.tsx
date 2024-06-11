'use client';

import Image from 'next/image';
import personaImage from '@/image/cui.jpg'; // Ruta a tu imagen
import restauranteImage from '@/image/cuychiquito.jpg'; // Ruta a tu imagen
import { useRouter } from 'next/navigation';

const SelectionView = () => {
  const router = useRouter();

  function handleRegister() {
    router.push('/auth/register');
  }
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-3xl text-red-700 mb-6">Registar</h1>
      <h1 className="text-3xl text-red-700 mb-6">Selecciona una Opción</h1>
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <Image
            src={personaImage}
            alt="Persona Natural"
            width={100}
            height={100}
          />
          <button
            className="w-full bg-red-700 text-yellow-500 border-none py-2 mt-2 rounded hover:bg-red-800 text-lg"
            onClick={handleRegister}
          >
            Persona Natural
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={restauranteImage}
            alt="Restaurante"
            width={100}
            height={100}
          />
          <button className="w-full bg-red-700 text-yellow-500 border-none py-2 mt-2 rounded hover:bg-red-800 text-lg">
            Restaurante
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionView;
