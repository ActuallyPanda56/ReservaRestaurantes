'use client';

import { Field, FormikProvider, FormikValues, useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useProfileForm from '../hooks/useProfileForm';
import { userStore } from '@/store/user';
import ImageUploader from '@/components/common/ImageUploader';
import { AspectRatio } from '@/components/constants/enums';

export default function ProfileForm({ userData }: any) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();
  const { setValues, values, handleSubmit, touched, errors, setFieldValue } =
    formikContext;
  
  // Update Formik initial values when userData changes
  useEffect(() => {
    setValues(userData);
  }, [userData]);

  // Function to update user data
  const updateUser = async (values) => {
    try {
      const response = await axios.post('/api/updateUser', values);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Modified handleSubmit to send updated data to the server
  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateUser(values);
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-5 w-full">
      <div className="flex gap-10">
        <div className="flex flex-col gap-1 pl-20 w-full">
          <span className="text-xl font-bold">Nombre</span>
          <div
            className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
              values.name !== userData.name
                ? 'outline-[--foreground]'
                : 'outline-gray-200 '
            }`}
          >
            <Field
              name="name"
              type="text"
              className="w-full h-full focus:outline-none text- py-2"
            />
            {values.name !== userData.name && (
              <button
                className="absolute right-2 btn-primary"
                type="button"
                onClick={() => {
                  setFieldValue('name', userData.name);
                }}
              >
                Restablecer
              </button>
            )}
          </div>
          {touched.name && errors.name ? (
            <div className="text-red-600 text-">{String(errors.name)}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-1 pr-20 w-full">
          <span className="text-xl font-bold">Apellido</span>
          <div
            className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
              values.lastName !== userData.lastName
                ? 'outline-[--foreground]'
                : 'outline-gray-200 '
            }`}
          >
            <Field
              name="lastName"
              type="text"
              className="w-full h-full focus:outline-none text- py-2"
            />
            {values.lastName !== userData.lastName && (
              <button
                className="absolute right-2 btn-primary"
                type="button"
                onClick={() => {
                  setFieldValue('lastName', userData.lastName);
                }}
              >
                Restablecer
              </button>
            )}
          </div>
          {touched.lastName && errors.lastName ? (
            <div className="text-red-600 text-">{String(errors.lastName)}</div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Correo Electrónico</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.email !== userData.email
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="email"
            type="text"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.email !== userData.email && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('email', userData.email);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.email && errors.email ? (
          <div className="text-red-600 text-">{String(errors.email)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Número de teléfono</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.phoneNumber !== userData.phoneNumber
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="phoneNumber"
            type="text"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.phoneNumber !== userData.phoneNumber && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('phoneNumber', userData.phoneNumber);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.phoneNumber && errors.phoneNumber ? (
          <div className="text-red-600 text-">{String(errors.phoneNumber)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Identificación</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.identification !== userData.identification
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="identification"
            type="text"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.identification !== userData.identification && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('identification', userData.identification);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.identification && errors.identification ? (
          <div className="text-red-600 text-">
            {String(errors.identification)}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Fecha de nacimiento</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.birthDate !== userData.birthDate
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="birthDate"
            type="date"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.birthDate !== userData.birthDate && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('birthDate', userData.birthDate);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.birthDate && errors.birthDate ? (
          <div className="text-red-600 text-">{String(errors.birthDate)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Contraseña</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.password !== userData.password
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="password"
            type="password"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.password !== userData.password && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('password', userData.password);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.password && errors.password ? (
          <div className="text-red-600 text-">{String(errors.password)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Dirección</span>
        <div
          className={`flex relative items-center gap-2 px-5 border-b outline rounded-lg py-3 transition-all ${
            values.address !== userData.address
              ? 'outline-[--foreground]'
              : 'outline-gray-200 '
          }`}
        >
          <Field
            name="address"
            type="text"
            className="w-full h-full focus:outline-none text- py-2"
          />
          {values.address !== userData.address && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('address', userData.address);
              }}
            >
              Restablecer
            </button>
          )}
        </div>
        {touched.address && errors.address ? (
          <div className="text-red-600 text-">{String(errors.address)}</div>
        ) : null}
      </div>
      <div className="flex justify-between px-20">
        <button className="btn-alert rounded-lg">Cerrar sesión</button>
        {(values.name !== userData.name ||
          values.lastName !== userData.lastName ||
          values.email !== userData.email ||
          values.phoneNumber !== userData.phoneNumber ||
          values.identification !== userData.identification ||
          values.birthDate !== userData.birthDate ||
          values.password !== userData.password ||
          values.address !== userData.address ||
          values.profilePicture !== userData.profilePicture) && (
          <button
            type="submit"
            className="btn-primary px-10 py-2 text-white font-bold rounded-lg transition-all"
          >
            Guardar cambios
          </button>
        )}
      </div>
    </form>
  );
}
