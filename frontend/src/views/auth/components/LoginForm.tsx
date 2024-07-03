'use client';

import React, { useState } from 'react';
import { Field, FormikProvider, ErrorMessage } from 'formik';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import useLoginForm from '../hooks/useLoginForm';

export default function LoginForm() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const formik = useLoginForm();
  const { submitForm, values, touched, errors } = formik;

  return (
    <FormikProvider value={formik}>
      <div className="flex flex-col justify-between h-full py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className={`flex relative items-center gap-2 px-2 border-b transition-all ${values.email !== '' && 'border-[--foreground]' }`}>
              <Field
                name="email"
                type="text"
                placeholder="Correo electrónico"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              />
            </div>
            {errors.email && touched.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          <div className="flex flex-col">
            <div className={`flex relative items-center gap-2 px-2 border-b transition-all ${values.password !== '' && 'border-[--foreground]' }`}>
              <Field
                name="password"
                type={isPasswordShowing ? 'text' : 'password'}
                placeholder="Contraseña"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              />
              <span
                onClick={() => {
                  setIsPasswordShowing(!isPasswordShowing);
                }}
                className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {isPasswordShowing ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>
            {errors.password && touched.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
          </div>
        </div>
        <button
          type="button"
          onClick={submitForm}
          className="btn-primary"
        >
          Iniciar Sesión
        </button>
      </div>
    </FormikProvider>
  );
}
