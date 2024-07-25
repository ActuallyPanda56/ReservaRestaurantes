import React, { useState } from 'react';
import { Field, FormikProvider, ErrorMessage } from 'formik';
import CountrySelect from '@/components/common/CountrySelect';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { countries } from '@/components/constants/country';
import useRegisterForm from '../hooks/useRegisterForm';
import Link from 'next/link';

export default function RegisterForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] =
    useState(false);

  const formik = useRegisterForm();
  const { submitForm, errors, touched } = formik;

  const handleCountryChange = (event: any) => {
    const selectedIsoCode = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.isoCode === selectedIsoCode
    );

    formik.setValues({
      email: formik.values.email,
      isoCode: selectedCountry?.isoCode ?? 'CO',
      name: formik.values.name,
      lastName: formik.values.lastName,
      phoneCode: selectedCountry?.phoneCode ?? '+57',
      phoneNumber: formik.values.phoneNumber,
      password: formik.values.password,
      confirmPassword: formik.values.confirmPassword,
      terms: formik.values.terms,
    });
  };

  return (
    <FormikProvider value={formik}>
      <div className="flex flex-col justify-between h-full py-5">
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
                placeholder="Correo electrónico"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              ></Field>
            </div>
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <div
                className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                  formik.values.name !== '' ? 'border-[--foreground]' : ''
                }`}
              >
                <Field
                  name="name"
                  type="text"
                  placeholder="Nombres"
                  className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
                ></Field>
              </div>
              {touched.name && errors.name && (
                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                  formik.values.lastName !== '' ? 'border-[--foreground]' : ''
                }`}
              >
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Apellidos"
                  className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
                ></Field>
              </div>
              {touched.lastName && errors.lastName && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className={`flex relative items-center gap-2 border-b transition-all ${
                formik.values.phoneNumber !== '' ? 'border-[--foreground]' : ''
              }`}
            >
              <CountrySelect
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                formik={formik}
                handleCountryChange={handleCountryChange}
              />
              <Field
                name="phoneNumber"
                type="number"
                placeholder="Número de teléfono"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-full focus:outline-none text-sm placeholder:tracking-tight tracking-wider placeholder:text-gray-600"
              ></Field>
            </div>
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="text-red-500 text-xs mt-1">
                {errors.phoneNumber}
              </div>
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
            </div>
            {touched.password && errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div
              className={`flex relative items-center gap-2 px-2 border-b transition-all ${
                formik.values.confirmPassword !== ''
                  ? 'border-[--foreground]'
                  : ''
              }`}
            >
              <Field
                name="confirmPassword"
                type={!isConfirmPasswordShowing ? 'password' : 'text'}
                placeholder="Confirma tu contraseña"
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              ></Field>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Field type="checkbox" name="terms" className="" />
              <div className="flex gap-1 text-xs items-center text-gray-500">
                <span>Acepto</span>
                <Link
                  href="terms-of-service"
                  className="text-blue-600 underline"
                >
                  Términos de uso y política de privacidad
                </Link>
              </div>
            </div>
            {touched.terms && errors.terms && (
              <div className="text-red-500 text-xs mt-1">{errors.terms}</div>
            )}
          </div>
        </div>
        <button
          type="submit"
          onClick={submitForm}
          className="btn-primary mt-10"
        >
          Registrarme
        </button>
      </div>
    </FormikProvider>
  );
}
