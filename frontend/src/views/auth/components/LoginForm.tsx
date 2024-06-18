import React, { useState } from 'react';
import { Field, FormikProvider, ErrorMessage } from 'formik';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import useLoginForm from '../hooks/useLoginForm';

export default function LoginForm() {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const formik = useLoginForm();
  const { submitForm, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <div className={`flex flex-col justify-between h-full py-5`}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div
              className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                formik.values.email !== '' ? 'border-[--foreground]' : ''
              }`}
            >
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              ></Field>
            </div>
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div
              className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                formik.values.password !== '' ? 'border-[--foreground]' : ''
              }`}
            >
              <Field
                name="password"
                type={!isPasswordShowing ? 'password' : 'text'}
                placeholder="Contraseña"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              ></Field>
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
            {touched.password && errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
          </div>
        </div>
        <button type="button" onClick={submitForm} className="btn-primary">
          Iniciar sesión
        </button>
      </div>
    </FormikProvider>
  );
}
