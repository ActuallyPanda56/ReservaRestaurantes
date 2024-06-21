'use client';

import { Field, FormikValues, useFormikContext } from 'formik';
import React from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  showLabel?: boolean;
  value?: string;
}

export default function InputField({
  name,
  type,
  label,
  showLabel = false,
}: InputFieldProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();

  const { values, touched, errors } = formikContext;

  return (
    <div>
      <div
        className={`flex relative items-center gap-2 px-2 py-1 border border-[--shadow] rounded-lg transition-colors ${
          values[name] !== '' ? 'border-[--foreground] border-2' : ''
        }`}
      >
        {values[name] !== '' && showLabel && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: values[name] !== '' ? 'auto' : 0,
              opacity: values[name] !== '' ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white absolute -top-2 left-3 text-xs px-1"
          >
            {label}
          </motion.span>
        )}
        <Field
          name={name}
          type={type}
          placeholder={label}
          className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
        />
      </div>
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-xs mt-1">
          {errors[name] as string}
        </div>
      )}
    </div>
  );
}
