'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const router = useRouter();

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg h-[750px] w-full max-w-md p-6 sm:p-8 gap-4 shadow-2xl shadow-[--shadow] relative">
        <span className="tracking-tighter text-2xl sm:text-3xl font-light">
          {isLogin ? 'Inicia sesión' : 'Regístrate'}
        </span>
        <div className="flex text-gray-500 tracking-tighter text-xs sm:text-sm gap-6 sm:gap-10 underline underline-offset-[6px] sm:underline-offset-[10px]">
          <button
            className={`hover:underline underline-offset-[6px] sm:underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              isLogin ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Inicia sesión con tu cuenta
          </button>
          <button
            className={`hover:underline underline-offset-[6px] sm:underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              !isLogin ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Regístrate
          </button>
        </div>
        <div className="flex flex-col w-full h-full justify-between">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="flex gap-3 text-xs justify-center">
            <button className="text-gray-600 hover:underline" onClick={() => {router.push('/auth/reset-password')}}>
              ¿Olvidaste tu contraseña?
            </button>
            <span className="text-gray-400">|</span>
            <div className="flex gap-1 items-center">
              <span className="text-gray-600">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              </span>
              <button
                onClick={handleIsLogin}
                className="text-orange-500 hover:underline"
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
