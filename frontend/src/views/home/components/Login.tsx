'use client';

import React from 'react';

export default function Login() {
  return (
    <>
      <div className="flex flex-col bg-white rounded-lg max-h-[600px] w-[600px] p-8 gap-4 shadow-2xl shadow-[--shadow]">
        <span className="tracking-tighter text-3xl font-light">
          Inicio de sesión
        </span>
        <div className="flex text-gray-500 tracking-tighter text-sm gap-10 underline underline-offset-[10px] ">
          <button className="hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2">
            Iniciar sesión con cuenta
          </button>
          <button className="hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2">
            Iniciar sesión con el código de verificación
          </button>
        </div>
        <form action="">
          <div className="flex gap-2">
            <button
              type="button"
              className="w-[180px] bg-gray-300 hover:bg-gray-400 p-1"
            >
              CNT +exmpl
            </button>
            <input type="text" placeholder="Número de teléfono" />
          </div>
        </form>
      </div>
    </>
  );
}
