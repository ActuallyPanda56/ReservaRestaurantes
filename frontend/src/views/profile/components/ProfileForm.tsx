'use client';

import { Field, FormikProvider, FormikValues, useFormikContext } from 'formik';
import React, { useState, useEffect } from 'react';
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex gap-10">
        <div className="flex flex-col gap-1 pl-20 w-full">
          <span className="text-xl font-bold">Name</span>
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
              className="w-full h-full focus:outline-none text-sm py-2"
            />
            {values.name !== userData.name && (
              <button
                className="absolute right-2 btn-primary"
                type="button"
                onClick={() => {
                  setFieldValue('name', userData.name);
                }}
              >
                Reset
              </button>
            )}
          </div>
          {touched.name && errors.name ? (
            <div className="text-red-600 text-sm">{String(errors.name)}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-1 pr-20 w-full">
          <span className="text-xl font-bold">Last Name</span>
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
              className="w-full h-full focus:outline-none text-sm py-2"
            />
            {values.lastName !== userData.lastName && (
              <button
                className="absolute right-2 btn-primary"
                type="button"
                onClick={() => {
                  setFieldValue('lastName', userData.lastName);
                }}
              >
                Reset
              </button>
            )}
          </div>
          {touched.lastName && errors.lastName ? (
            <div className="text-red-600 text-sm">
              {String(errors.lastName)}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Email</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.email !== userData.email && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('email', userData.email);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.email && errors.email ? (
          <div className="text-red-600 text-sm">{String(errors.email)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Phone Number</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.phoneNumber !== userData.phoneNumber && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('phoneNumber', userData.phoneNumber);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.phoneNumber && errors.phoneNumber ? (
          <div className="text-red-600 text-sm">
            {String(errors.phoneNumber)}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Identification</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.identification !== userData.identification && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('identification', userData.identification);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.identification && errors.identification ? (
          <div className="text-red-600 text-sm">
            {String(errors.identification)}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Birth Date</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.birthDate !== userData.birthDate && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('birthDate', userData.birthDate);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.birthDate && errors.birthDate ? (
          <div className="text-red-600 text-sm">{String(errors.birthDate)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Password</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.password !== userData.password && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('password', userData.password);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.password && errors.password ? (
          <div className="text-red-600 text-sm">{String(errors.password)}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-20">
        <span className="text-xl font-bold">Address</span>
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
            className="w-full h-full focus:outline-none text-sm py-2"
          />
          {values.address !== userData.address && (
            <button
              className="absolute right-2 btn-primary"
              type="button"
              onClick={() => {
                setFieldValue('address', userData.address);
              }}
            >
              Reset
            </button>
          )}
        </div>
        {touched.address && errors.address ? (
          <div className="text-red-600 text-sm">{String(errors.address)}</div>
        ) : null}
      </div>

      {values !== userData && (
        <div className="flex justify-end px-20">
          <button
            type="submit"
            className="btn-primary px-10 py-2 text-white font-bold rounded-lg transition-all"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
