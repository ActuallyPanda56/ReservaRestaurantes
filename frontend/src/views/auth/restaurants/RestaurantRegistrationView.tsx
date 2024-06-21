'use client';

import React, { useEffect, useState } from 'react';
import useRestaurantRegisterForm from './hooks/useRestaurantForm';
import { Field, FormikProvider } from 'formik';
import MarkdownEditor from '@/components/common/MarkDownEditor';
import ImageUploader from '@/components/common/ImageUploader';
import { AspectRatio } from '@/components/constants/enums';
import InputField from '@/components/common/FieldTypes/InputField';
import RestaurantCapacity from './components/RestaurantCapacity';
import BasicTable from '@/components/common/table/BasicTable';

export default function RestaurantRegistrationView() {
  const restaurantTypes = [
    { value: 'restaurant', label: 'Restaurante' },
    { value: 'bar', label: 'Bar' },
    { value: 'dinner', label: 'Cena' },
    { value: 'fast food', label: 'Comida rápida' },
    // Add more options as needed
  ];

  const [isEditing, setIsEditing] = useState(true);

  const formik = useRestaurantRegisterForm();
  const { values, touched, errors, submitForm } = formik;

  const handleChangeEdit = () => {
    setIsEditing(true);
  };

  const tableRows = values.capacity.map((item) => ({
    tableCapacity: item.tableCapacity.toString(),
    tableCount: item.tableCount.toString(),
  }));

  return (
    <>
      <FormikProvider value={formik}>
        <div className="my-20 w-screen flex justify-center items-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">
                ¡Registra tu primer restaurante!
              </h1>
              <p>
                Aquí podrás registrar tu primer restaurante para comenzar a
                manejarlo
              </p>
            </div>

            {/* Información Básica */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="text-white bg-[--foreground] w-6 h-6 flex items-center justify-center rounded-xl text-lg font-bold">
                    1
                  </div>
                  <h3>Información Básica</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Nombre de tu restaurante
                </span>
                <InputField
                  name="name"
                  type="text"
                  label="Nombre de tu restaurante"
                />
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Descripción de tu restaurante
                </span>
                <MarkdownEditor
                  name="description"
                  placeholder="Escribe una descripción para tu restaurante..."
                />
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader
                    name="banner"
                    aspectRatio={AspectRatio.banner}
                    label="Banner de tu restaurante"
                  />
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="text-white bg-[--foreground] w-6 h-6 flex items-center justify-center rounded-xl text-lg font-bold">
                    2
                  </div>
                  <h3>Información Adicional</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Tipo de restaurante
                </span>
                <div
                  className={`flex relative items-center gap-2 px-2 py-1 border border-[--shadow] rounded-lg transition-colors  ${
                    values.type !== '' ? 'border-[--foreground] border-2' : ''
                  }`}
                >
                  {/* Dropdown for restaurant type */}
                  <Field
                    as="select"
                    name="type"
                    className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600 bg-white rounded-lg cursor-pointer"
                  >
                    {restaurantTypes.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="text-gray-900 hover:bg-gray-200"
                      >
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                {touched.type && errors.type && (
                  <div className="text-red-500 text-xs mt-1">{errors.type}</div>
                )}
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Dirección de tu restaurante
                </span>
                <InputField name="address" type="text" label="Dirección" />
                {isEditing ? (
                  <div className="flex flex-col gap-2 w-full items-end">
                    <RestaurantCapacity
                      name="capacity"
                      label="Capacidad de tu restaurante"
                      type="number"
                    />
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full items-end">
                    <BasicTable
                      rows={tableRows}
                      headers={['Tamaño de tus mesas', 'Cantidad de mesas']}
                    />
                    <button
                      className="btn-primary w-[80px]"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      Editar
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Field
                    name="ageRestricted"
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label htmlFor="ageRestricted">
                    ¿Tiene restricción de edad?
                  </label>
                </div>
                {touched.ageRestricted && errors.ageRestricted && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.ageRestricted}
                  </div>
                )}
              </div>
            </div>

            {/* Imágenes Opcionales */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="text-white bg-[--foreground] w-6 h-6 flex items-center justify-center rounded-xl text-lg font-bold">
                    3
                  </div>
                  <h3>Tu menú</h3>
                </div>
                <span className="text-sm text-gray-600">*No requerido</span>
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader name="menuPictures[0]" label="Menú" array />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="text-white bg-[--foreground] w-6 h-6 flex items-center justify-center rounded-xl text-lg font-bold">
                    4
                  </div>
                  <h3>Añade vida a tu restaurante</h3>
                </div>
                <span className="text-sm text-gray-600">*No requerido</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader name="pictures[0]" label="Imagen 1" array />
                </div>
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader name="pictures[1]" label="Imagen 2" array />
                </div>
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader name="pictures[2]" label="Imagen 3" array />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary mt-5"
              onClick={submitForm}
            >
              Enviar Registro
            </button>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}
