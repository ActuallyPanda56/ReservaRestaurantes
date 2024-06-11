import React from 'react';
import { GoLocation } from 'react-icons/go';
import Login from './components/Login';

// TODO: Fix styles

export default function HomeView() {
  return (
    <main>
      <div className="flex flex-col gap-20 w-screen relative">
        <div className="flex justify-between h-screen w-screen px-20 pt-20 -z-10">
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
            <span>Slider</span>
          </div>
          <Login />
          <div className="w-screen h-[320px] absolute top-0 left-0 bg-[--foreground] -z-[5]" />
        </div>

        <div>
          <span>Slider</span>
        </div>
      </div>
    </main>
  );
}
