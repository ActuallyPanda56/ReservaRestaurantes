'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import EmailForm from './components/EmailForm';

export default function ResetPasswordView() {
  const [isEmail, setIsEmail] = useState(true);

  const router = useRouter();

  return (
    <>
      <div className="py-10 w-screen flex justify-center items-center">
        <div className="flex flex-col bg-white rounded-lg h-[500px] w-full max-w-md p-6 sm:p-8 gap-4 shadow-2xl shadow-[--shadow] relative">
          <span className="tracking-tighter text-2xl sm:text-3xl font-light">
            Recupera tu contraseña
          </span>
          <div className="flex text-gray-500 tracking-tighter text-xs sm:text-sm gap-6 sm:gap-10 underline underline-offset-[6px] sm:underline-offset-[10px]">
            <button
              className={`hover:underline underline-offset-[6px] sm:underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
                isEmail ? 'underline decoration-orange-500 text-gray-800' : ''
              } `}
              onClick={() => {
                setIsEmail(true);
              }}
            >
              Por correo electrónico
            </button>
            <button
              className={`hover:underline underline-offset-[6px] sm:underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
                !isEmail ? 'underline decoration-orange-500 text-gray-800' : ''
              } `}
              onClick={() => {
                setIsEmail(false);
              }}
            >
              Por número de teléfono
            </button>
          </div>
          <span className="text-sm text-gray-600 italic tracking-tighter">
            Enviaremos un código de recuperación a tu{' '}
            {isEmail ? 'correo electrónico' : 'teléfono celular'}
          </span>
          <div className="flex flex-col w-full h-full justify-between">
            {isEmail ? <EmailForm /> : 'Phone number form'}
            <div className="flex gap-3 text-xs justify-center">
              <button
                className="text-gray-600 hover:underline"
                onClick={() => {
                  router.push('/auth');
                }}
              >
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
