import { Field, FieldArray, FormikValues, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { number } from 'yup';

interface RestaurantMenuProps {
  name: string;
  label: string;
}

export default function RestaurantMenu({ name, label }: RestaurantMenuProps) {
  const fieldNames: { [key: string]: string } = {
    name: 'Nombre',
    description: 'Descripción',
    price: 'Precio',
  };

  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();

  const [fieldNumber, setFieldNumber] = useState(1);

  const { values, touched, errors, setFieldValue } = formikContext;

  useEffect(() => {
    if (!values[name] || values[name].length === 0) {
      setFieldValue(name, [{ name: '', description: '', price: '' }]);
    }
  }, [name, setFieldValue, values]);

  return (
    <>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {values[name] &&
              values[name].length > 0 &&
              values[name].map((_: any, index: number) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-end gap-1"
                >
                  <div className=" w-full grid grid-cols-3 grid-rows-2 gap-2">
                    {['name', 'price', 'description'].map((property) => (
                      <div
                        key={`${name}-${index}-${property}`}
                        className={`flex relative items-center gap-2 px-2 py-1 border border-[--shadow] rounded-lg transition-colors w-full ${
                          values[name][index][property] !== ''
                            ? 'border-[--foreground] border-2'
                            : ''
                        } ${property === 'name' && 'col-span-2'} ${
                          property === 'description' && 'col-span-3'
                        }`}
                      >
                        <Field
                          name={`${name}[${index}].${property}`}
                          type={property === 'price' ? 'number' : 'text'}
                          placeholder={fieldNames[property]}
                          className={`w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600 `}
                        />
                      </div>
                    ))}
                  </div>
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
            <button
              className="btn-primary rounded-lg w-full mt-2"
              onClick={() => {
                setFieldNumber(fieldNumber + 1);
                arrayHelpers.push({ name: '', description: '', price: '' });
              }}
            >
              Agregar
            </button>
          </>
        )}
      />
    </>
  );
}
