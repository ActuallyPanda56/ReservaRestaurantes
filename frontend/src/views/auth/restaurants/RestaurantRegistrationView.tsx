'use client';

import React, { useEffect, useState } from 'react';
import useRestaurantRegisterForm from './hooks/useRestaurantForm';
import { Field, FieldArray, FormikProvider } from 'formik';
import MarkdownEditor from '@/components/common/MarkDownEditor';
import ImageUploader from '@/components/common/ImageUploader';
import { AspectRatio, RestaurantType } from '@/components/constants/enums';
import InputField from '@/components/common/FieldTypes/InputField';
import RestaurantCapacity from './components/RestaurantCapacity';
import BasicTable from '@/components/common/table/BasicTable';
import RestaurantPhones from './components/RestaurantPhones';
import RestaurantMenu from './components/RestaurantMenu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RestaurantSchedule from './components/RestaurantSchedule';

export default function RestaurantRegistrationView() {
  const [isEditing, setIsEditing] = useState(true);
  const [isScheduleEditing, setIsScheduleEditing] = useState(true);

  const router = useRouter();

  const formik = useRestaurantRegisterForm();
  const { values, touched, errors, submitForm } = formik;

  const handleSaveTable = () => {
    values.capacity = values.capacity.filter((table) => {
      return !(
        typeof table.tableCapacity !== 'number' ||
        table.tableCapacity <= 0 ||
        typeof table.tableCount !== 'number' ||
        table.tableCount <= 0
      );
    });

    // Delete tables with repeated capacity
    values.capacity = values.capacity.filter(
      (table, index, self) =>
        index === self.findIndex((t) => t.tableCapacity === table.tableCapacity)
    );

    // Sort tables by capacity
    values.capacity.sort((a, b) => +a.tableCapacity - +b.tableCapacity);

    setIsEditing(false);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <div className="my-20 px-5 w-screen flex justify-center items-center">
          <Link href="/" className="btn-alert fixed top-5 left-5 rounded-lg">
            Cancelar
          </Link>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">¡Registra tu restaurante!</h1>
              <p>
                Aquí podrás registrar tu restaurante para comenzar a manejarlo.
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
                <div className="max-w-[655px]">
                  <MarkdownEditor
                    name="description"
                    placeholder="Escribe una descripción para tu restaurante..."
                  />
                </div>
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Descripción corta de tu restaurante
                </span>
                <InputField
                  name="shortDescription"
                  type="text"
                  label="Descripción corta de tu restaurante"
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
                <span className="text-sm text-gray-500 tracking-tight font-bold">
                  Teléfonos
                </span>
                <span className="text-xs text-gray-500 tracking-tight -mt-2">
                  Ten en cuenta que solo aceptamos números de teléfono
                  nacionales
                </span>
                <RestaurantPhones
                  name="phoneNumber"
                  label="Ej. 12345678"
                  type="text"
                />
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
                    values.type !== RestaurantType.restaurant
                      ? 'border-[--foreground] border-2'
                      : ''
                  }`}
                >
                  {/* Dropdown for restaurant type */}
                  <Field
                    as="select"
                    name="type"
                    className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600 bg-white rounded-lg cursor-pointer"
                  >
                    {Object.values(RestaurantType).map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="text-gray-900 hover:bg-gray-200"
                      >
                        {option}
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
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm text-gray-500 tracking-tight font-bold">
                      Capacidad de tu restaurante
                    </span>
                    <div
                      className={`flex text-gray-500 tracking-tight text-xs ${
                        values.capacity.length > 1 ? 'gap-40' : 'gap-[216px]'
                      }`}
                    >
                      <span>Tamaño de tus mesas</span>
                      <span>Número de mesas</span>
                    </div>
                    <RestaurantCapacity
                      name="capacity"
                      label="Capacidad de tu restaurante"
                      type="number"
                    />
                    <div className="flex w-full justify-end">
                      <button
                        className="btn-primary w-[120px]"
                        onClick={() => {
                          handleSaveTable();
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full items-end">
                    <BasicTable
                      rows={values.capacity}
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
                    id="ageRestricted"
                    name="ageRestricted"
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="ageRestricted"
                    className="ml-2 block text-sm text-gray-900"
                  >
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

            {/* Menú */}
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
              <div className="flex flex-col gap-2 ">
                <div
                  className={`flex relative items-center gap-2 justify-center w-full`}
                >
                  <ImageUploader
                    name="menuPicture"
                    label="Foto de tu menú"
                    aspectRatio={AspectRatio.free}
                  />
                </div>
                <span className="text-sm text-gray-500 tracking-tight font-bold mt-2">
                  Añade los platos de tu menú
                </span>
                <RestaurantMenu name="menuInfo" label="Menú" />
              </div>
            </div>

            {/* Imágenes Opcionales */}
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

            {/* Horario */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="text-white bg-[--foreground] w-6 h-6 flex items-center justify-center rounded-xl text-lg font-bold">
                    5
                  </div>
                  <h3>Horario</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm text-gray-500 tracking-tight font-bold">
                      Capacidad de tu restaurante
                    </span>
                    <div
                      className={`flex text-gray-500 tracking-tight text-xs ${
                        values.schedule.length > 1 ? 'gap-40' : 'gap-[216px]'
                      }`}
                    ></div>
                    <RestaurantSchedule
                      name="schedule"
                      label="Capacidad de tu restaurante"
                      type="number"
                    />
                    <div className="flex w-full justify-end">
                      <button
                        className="btn-primary w-[120px]"
                        onClick={() => {
                          handleSaveTable();
                        }}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full items-end">
                    <BasicTable
                      rows={values.schedule}
                      headers={['Día', 'Apertura', 'Cierre']}
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
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary mt-5"
              onClick={() => {
                handleSaveTable();
                submitForm();
              }}
            >
              Enviar Registro
            </button>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}
