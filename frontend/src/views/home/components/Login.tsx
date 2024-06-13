'use client';

import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Link from 'next/link';
import { countries } from '@/components/constants/country';
import CountrySelect from './CountrySelect';

export default function Login() {
  // TODO: Form con FORMIK y validaciones con Yup
  // TODO: Alternativamente, mover el formulario a un componente separado

  const [isPasswordShowing, setIsPasswordShowing] = useState(true);
  const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] =
    useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[46]);
  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg max-h-[600px] w-[600px] p-8 gap-4 shadow-2xl shadow-[--shadow] relative z-20">
        <span className="tracking-tighter text-3xl font-light">
          Inicio de sesión
        </span>
        <div className="flex text-gray-500 tracking-tighter text-sm gap-10 underline underline-offset-[10px] ">
          <button
            className={`hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              isLogin ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión con cuenta
          </button>
          <button
            className={`hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              !isLogin ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => setIsLogin(false)}
          >
            Regístrate
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
                type={!isPasswordShowing ? 'password' : 'text'}
                className="bg-gray-100 w-full focus:outline-none text-xs placeholder:text-gray-500 border-b focus:border-b-[--foreground] transition-colors duration-200 px-4"
                placeholder="Contraseña"
              />
              {isPasswordShowing ? (
                <GoEye
                  onClick={() => {
                    setIsPasswordShowing(!isPasswordShowing);
                  }}
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => {
                    setIsPasswordShowing(!isPasswordShowing);
                  }}
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>

            {!isLogin && (
              <div className="flex items-center relative">
                <input
                  type={!isConfirmPasswordShowing ? 'password' : 'text'}
                  className="bg-gray-100 w-full focus:outline-none text-xs placeholder:text-gray-500 border-b focus:border-b-[--foreground] transition-colors duration-200 px-4"
                  placeholder="Confirma tu contraseña"
                />
                {isConfirmPasswordShowing ? (
                  <GoEye
                    onClick={() => {
                      setIsConfirmPasswordShowing(!isConfirmPasswordShowing);
                    }}
                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                ) : (
                  <GoEyeClosed
                    onClick={() => {
                      setIsConfirmPasswordShowing(!isConfirmPasswordShowing);
                    }}
                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>
            )}

            {!isLogin && (
              <div className="flex gap-1 items-center">
                <input type="checkbox" className="w-[15px]" />
                <span className="text-xs text-gray-400">Acepto</span>
                <Link
                  href="/terms-of-service"
                  className="text-xs text-blue-600 underline"
                >
                  Términos de uso y política de privacidad
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="px-5">
              {isLogin ? (
                <span className="text-xs text-gray-400">
                  ¿No tienes cuenta?{' '}
                </span>
              ) : (
                <span className="text-xs text-gray-400">
                  ¿Ya tienes cuenta?{' '}
                </span>
              )}
              <button
                type="button"
                className="text-xs text-orange-500 underline italic"
                onClick={handleIsLogin}
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </div>
            <button className="btn-primary">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </>
  );
}
