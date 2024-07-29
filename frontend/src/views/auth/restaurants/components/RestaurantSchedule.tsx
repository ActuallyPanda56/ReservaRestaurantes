import { daysInWeek } from 'date-fns/constants';
import { Field, FormikValues, useFormikContext, FieldArray } from 'formik';
import React, { useEffect, useState } from 'react';
import { DayType } from '@/components/constants/enums';

interface RestaurantScheduleProps {
  name: string;
  label: string;
  type: string;
}

export default function RestaurantSchedule({
  name,
  label,
}: RestaurantScheduleProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();

  const initialValues = [
    { day: 'Lunes', open: '08:00', close: '20:00' },
    { day: 'Martes', open: '08:00', close: '20:00' },
    { day: 'Miércoles', open: '08:00', close: '20:00' },
    { day: 'Jueves', open: '08:00', close: '20:00' },
    { day: 'Viernes', open: '08:00', close: '20:00' },
    { day: 'Sábado', open: '08:00', close: '20:00' },
    { day: 'Domingo', open: '08:00', close: '20:00' },
  ];
  const days: DayType[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  const { values, setFieldValue } = formikContext;
  const className =
    'w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600';

  const [fieldNumber, setFieldNumber] = useState(1);

  // Ensure the initial values are set up correctly
  useEffect(() => {
    if (!values[name] || values[name].length === 0) {
      setFieldValue(name, initialValues);
    }
  }, [name, setFieldValue, values]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] &&
              values[name].length > 0 &&
              values[name].map((_: any, index: number) => (
                <div key={index} className="flex gap-2 w-full items-center">
                  {['day', 'open', 'close'].map((property) => (
                    <div
                      key={`${name}-${index}-${property}`}
                      className={`flex relative items-center gap-2 px-2 py-1 border border-[--shadow] rounded-lg transition-colors w-full ${
                        values[name][index][property] !== 0
                          ? 'border-[--foreground] border-2'
                          : ''
                      }`}
                    >
                      <Field
                        name={`${name}[${index}].${property}`}
                        type={property === 'day' ? 'text' : 'time'}
                        placeholder={
                          property === 'day'
                            ? 'Day'
                            : property === 'open'
                            ? 'Open'
                            : 'Close'
                        }
                        className={
                          className +
                          (property === 'day' ? ' text-gray-600 italic' : '')
                        }
                        disabled={property === 'day'}
                      />
                    </div>
                  ))}
                  {values[name].length > 1 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="btn-alert rounded-lg"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
          </>
        )}
      />
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            setFieldValue(name, initialValues);
          }}
          className="btn-primary rounded-lg w-full mt-2"
        >
          Restablecer
        </button>

        {/* Establece todas las horas de apertura y cierre como las del lunes */}
        <button
          onClick={() => {
            const monday = values[name][0];
            values[name].map((_: any, index: number) => {
              setFieldValue(`${name}[${index}].open`, monday.open);
              setFieldValue(`${name}[${index}].close`, monday.close);
            });
          }}
          className="btn-primary rounded-lg w-full mt-2"
        >
          Establecer para todos los días
        </button>
      </div>
    </div>
  );
}
