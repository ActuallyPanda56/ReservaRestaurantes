'use client';

import React, { useState } from 'react';
import { Field, FormikProvider, ErrorMessage } from 'formik';
import useEmailForm from '../hooks/useEmailForm';

export default function EmailForm() {

  const formik = useEmailForm();
  const { submitForm, values, touched, errors } = formik;

  const handleSubmit = async () => {
    await submitForm();
  };

  return (
    <FormikProvider value={formik}>
      <div className="flex flex-col justify-between h-full py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div
              className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                values.email !== '' && 'border-[--foreground]'
              }`}
            >
              <Field
                name="email"
                type="text"
                placeholder="Correo electrónico"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              />
            </div>
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
        </div>
        <button type="button" onClick={handleSubmit} className="btn-primary">
          Confirmar correo
        </button>
      </div>
    </FormikProvider>
  );
}
