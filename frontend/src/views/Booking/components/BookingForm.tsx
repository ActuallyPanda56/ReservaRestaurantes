import InputField from '@/components/common/FieldTypes/InputField';
import { User } from '@/components/constants/interfaces';
import { Field, FormikValues, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa6';

export default function BookingForm({
  userData,
  ageRestricted,
}: {
  userData: User;
  ageRestricted: boolean | undefined;
}) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();
  const { setValues, values, touched, errors, setFieldValue, submitForm } =
    formikContext;

  useEffect(() => {
    setValues({
      ...values,
      userId: userData.id,
      bearerName: userData.name + ' ' + userData.lastName,
    });
  }, [userData]);

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <span className="text-xl font-bold">Nombre de quien reserva</span>
          <div className="tracking-tighter text-gray-600 text-sm mb-2">
            <p>El nombre que usarás en el restaurante.</p>
            <p>
              Por defecto este nombre es el que registraste en tu cuenta, sin
              embargo puedes cambiarlo al nombre que quieras.
            </p>
          </div>
          <div
            className={`flex relative items-center gap-2 px-5 border-2 rounded-lg py-3 transition-all ${
              values.bearerName !== userData.name + ' ' + userData.lastName
                ? 'border-[--shadow]'
                : 'outline-gray-200 '
            }`}
          >
            <Field
              name="bearerName"
              type="text"
              className="w-full h-full focus:outline-none text- py-2"
            />
            {values.bearerName !== userData.name + ' ' + userData.lastName && (
              <button
                className="absolute right-2 btn-primary"
                type="button"
                onClick={() => {
                  setFieldValue(
                    'bearerName',
                    userData.name + ' ' + userData.lastName
                  );
                }}
              >
                Restablecer
              </button>
            )}
          </div>
          {touched.bearerName && errors.bearerName ? (
            <div className="text-red-600 text-">
              {String(errors.bearerName)}
            </div>
          ) : null}

          <div className="flex justify-between gap-10 w-full items-end mt-5">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xl font-bold">Adultos</span>
              <div className="tracking-tighter text-gray-600 text-sm mb-2">
                <p>
                  Selecciona el número de adultos que asistirán a la reserva.
                </p>
              </div>
              <InputField name="adults" type="number" label="Adultos" />
            </div>
            {ageRestricted ? (
              <div className="flex items-center justify-center p-2 text-sm bg-red-500 rounded-lg">
                <span className="italic text-white tracking-tight">
                  Este restaurante tiene restricción de edad. Solo adultos
                  podrán asistir!
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 w-full">
                <span className="text-xl font-bold">Niños</span>
                <div className="tracking-tighter text-gray-600 text-sm mb-2">
                  <p>
                    Selecciona el número de niños que asistirán a la reserva.
                  </p>
                </div>
                <InputField name="children" type="number" label="Niños" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 justify-between md:flex-row mt-5">
            <div className="flex flex-col gap-1 w-full relative">
              <span className="text-xl font-bold">Fecha</span>
              <div
                className={`flex relative items-center gap-2 px-5 border-2 rounded-lg py-3 transition-all ${
                  values.date !== '' ? 'border-[--shadow]' : 'outline-gray-200 '
                }`}
              >
                <Field
                  name="date"
                  type="date"
                  className="w-full h-full focus:outline-none text- py-2"
                />
              </div>
              {touched.date && errors.date ? (
                <div className="text-red-600 text-">{String(errors.date)}</div>
              ) : null}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="startTime" className="text-xl font-bold">
                Hora de Inicio
              </label>

              <div
                className={`flex relative items-center gap-2 px-5 border-2 rounded-lg py-3 transition-all ${
                  values.startTime !== ''
                    ? 'border-[--shadow]'
                    : 'outline-gray-200 '
                }`}
              >
                <Field
                  name="startTime"
                  type="time"
                  step="900"
                  className="w-full h-full focus:outline-none text- py-2"
                />
              </div>
              {touched.startTime && touched.endTime && errors.startTime ? (
                <div className="text-red-600 text-xs">
                  {String(errors.startTime)}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="endTime" className="text-xl font-bold">
                Hora de fin
              </label>

              <div
                className={`flex relative items-center gap-2 px-5 border-2 rounded-lg py-3 transition-all ${
                  values.endTime !== ''
                    ? 'border-[--shadow]'
                    : 'outline-gray-200 '
                }`}
              >
                <Field
                  name="endTime"
                  type="time"
                  className="w-full h-full focus:outline-none py-2 "
                />
              </div>
              {touched.startTime && touched.endTime && errors.endTime ? (
                <div className="text-red-600 text-xs">
                  {String(errors.endTime)}
                </div>
              ) : null}
            </div>
          </div>

          <button
            className="btn-primary mt-5 rounded-lg"
            type="submit"
            onClick={submitForm}
          >
            Reservar
          </button>
        </div>
      </div>
    </>
  );
}
