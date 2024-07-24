import InputField from '@/components/common/FieldTypes/InputField';
import { Field, FieldArray, FormikValues, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface RestaurantPhoneProps {
  name: string;
  label: string;
  type: string;
}

export default function RestaurantPhones({
  name,
  label,
  type,
}: RestaurantPhoneProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();

  const [fieldNumber, setFieldNumber] = useState(1);
  const { values, touched, errors, setFieldValue } = formikContext;

  useEffect(() => {
    if (!values[name] || values[name].length === 0) {
      setFieldValue(name, ['']);
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
                <div key={index} className="flex gap-2 w-full items-center">
                  <div className="flex flex-col w-full">
                    <div
                      className={`flex relative items-center gap-2 px-2 py-1 border border-[--shadow] rounded-lg transition-colors w-full ${
                        values[name][index] !== ''
                          ? 'border-[--foreground] border-2'
                          : ''
                      }`}
                    >
                      <Field
                        name={`${name}[${index}]`}
                        type={type}
                        placeholder={label}
                        className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
                      />
                    </div>
                    {touched[name] &&
                      Array.isArray(errors[name]) &&
                      errors[name][index] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[name][index] as string}
                        </div>
                      )}
                    {touched[name] &&
                      !Array.isArray(errors[name]) &&
                      errors[name] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[name] as string}
                        </div>
                      )}
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

            {/* ADD FUNCTION */}
            {values[name][0] !== '' && (
              <button
                className="btn-primary rounded-lg w-full mt-2"
                onClick={() => {
                  setFieldNumber(fieldNumber + 1);
                  arrayHelpers.push('');
                }}
              >
                Agregar
              </button>
            )}
          </>
        )}
      />
    </>
  );
}
