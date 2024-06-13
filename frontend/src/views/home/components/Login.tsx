'use client';

import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Link from 'next/link';
import { countries } from '@/components/constants/country';
import CountrySelect from './CountrySelect';

export default function Login() {
  // TODO: Form con FORMIK y validaciones con Yup

  const [isShowing, setIsShowing] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[46]);

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg max-h-[600px] w-[600px] p-8 gap-4 shadow-2xl shadow-[--shadow] relative z-20">
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
        <form
          action=""
          className="flex flex-col justify-between px-4 pt-5 h-full"
        >
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <CountrySelect
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
              <input
                type="number"
                placeholder="Número de teléfono"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-100 w-full focus:outline-none text-xs placeholder:text-gray-500 border-b focus:border-b-[--foreground] transition-colors duration-200 px-4"
              />
            </div>
            <div className="flex items-center relative">
              <input
                type={!isShowing ? 'password' : 'text'}
                className="bg-gray-100 w-full focus:outline-none text-xs placeholder:text-gray-500 border-b focus:border-b-[--foreground] transition-colors duration-200 px-4"
                placeholder="Contraseña"
              />
              {isShowing ? (
                <GoEye
                  onClick={() => {
                    setIsShowing(!isShowing);
                  }}
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => {
                    setIsShowing(!isShowing);
                  }}
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" className="w-[15px]" />
              <span className="text-xs text-gray-400">Acepto</span>
              <Link href="/terms" className="text-xs text-blue-600 underline">
                Términos de uso y política de privacidad
              </Link>
            </div>
          </div>
          <button className="btn-primary">Iniciar sesión</button>
        </form>
      </div>
    </>
  );
}
