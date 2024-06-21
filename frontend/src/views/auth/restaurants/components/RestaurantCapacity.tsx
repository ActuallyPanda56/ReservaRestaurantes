import InputField from '@/components/common/FieldTypes/InputField';
import { Field, FormikValues, useFormikContext, FieldArray } from 'formik';
import React, { useEffect, useState } from 'react';

interface RestaurantCapacityProps {
  name: string;
  label: string;
  type: string;
}

export default function RestaurantCapacity({
  name,
  label,
  type,
}: RestaurantCapacityProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();
  const { values, setFieldValue } = formikContext;
  const className =
    'w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600';

  const [fieldNumber, setFieldNumber] = useState(1);

  // Ensure the initial values are set up correctly
  useEffect(() => {
    if (!values[name] || values[name].length === 0) {
      setFieldValue(name, [{ tableCapacity: '', tableCount: '' }]);
    }
  }, [name, setFieldValue, values]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-sm text-gray-500 tracking-tight font-bold">
        {label}
      </span>
      <div className="flex justify-between text-gray-500 tracking-tight text-xs w-[365px]">
        <span>Tamaño de tus mesas</span>
        <span>Cantidad de mesas</span>
      </div>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] &&
              values[name].length > 0 &&
              values[name].map((_: any, index: number) => (
                <div key={index} className="flex gap-2 w-full items-center">
                  {['tableCapacity', 'tableCount'].map((property) => (
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
                        type={type}
                        placeholder={
                          property === 'tableCapacity'
                            ? 'Capacidad'
                            : 'Número de mesas'
                        }
                        className={className}
                      />
                    </div>
                  ))}
                  {values[name].length > 1 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="btn-alert rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
          </>
        )}
      />
      <button
        onClick={() => {
          setFieldNumber(fieldNumber + 1);
          setFieldValue(name, [
            ...values[name],
            { tableCapacity: '', tableCount: '' },
          ]);
        }}
        className="btn-primary"
      >
        Añadir mesa
      </button>
    </div>
  );
}
