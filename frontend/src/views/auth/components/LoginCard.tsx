// src\views\auth\components\LoginCard.tsx

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm'; // Asegúrate de importar ResetPasswordForm desde el archivo correcto

export default function LoginCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
    setShowResetPasswordForm(false); // Asegúrate de ocultar el formulario de restablecimiento al cambiar entre inicio de sesión y registro
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-lg h-[750px] w-[500px] p-8 gap-4 shadow-2xl shadow-[--shadow] relative">
        <span className="tracking-tighter text-3xl font-light">
          {showResetPasswordForm ? 'Restablecer contraseña' : 'Inicio de sesión'}
        </span>
        <div className="flex text-gray-500 tracking-tighter text-sm gap-10 underline underline-offset-[10px] ">
          <button
            className={`hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              isLogin && !showResetPasswordForm ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => {
              setIsLogin(true);
              setShowResetPasswordForm(false);
            }}
          >
            Inicia sesión con tu cuenta
          </button>
          <button
            className={`hover:underline underline-offset-[10px] hover:decoration-orange-500 hover:decoration-2 ${
              !isLogin && !showResetPasswordForm ? 'underline decoration-orange-500 text-gray-800' : ''
            } `}
            onClick={() => {
              setIsLogin(false);
              setShowResetPasswordForm(false);
            }}
          >
            Regístrate
          </button>
        </div>
        <div className="flex flex-col w-full h-full justify-between">
          {!showResetPasswordForm ? (
            isLogin ? (
              <LoginForm
                showResetPasswordForm={showResetPasswordForm}
                setShowResetPasswordForm={setShowResetPasswordForm}
              />
            ) : (
              <RegisterForm />
            )
          ) : (
            <ResetPasswordForm />
          )}
          {!showResetPasswordForm && (
            <div className="flex gap-3 text-xs justify-center">
              <button className="text-gray-600 hover:underline" onClick={() => setShowResetPasswordForm(true)}>
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
          )}
        </div>
      </div>
    </>
  );
}
