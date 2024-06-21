import 'react-quill/dist/quill.snow.css';

import { FormikValues, useFormikContext } from 'formik';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

interface MarkdownEditorProps {
  customLabel?: React.ReactNode;
  extraInfo?: string;
  name: string;
  placeholder?: string;
}

const MarkdownEditor = ({
  customLabel,
  extraInfo,
  name,
  placeholder = '',
}: MarkdownEditorProps) => {
  const formikContext = useFormikContext<FormikValues>();
  const { values, errors, touched } = formikContext;

  const handleChange = (markdown: string) => {
    formikContext.setFieldValue(name, markdown);
  };

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <div className="w-full flex flex-col gap-2">
      {customLabel && customLabel}
      <div>
        <ReactQuill
          theme="snow"
          placeholder={placeholder}
          value={values[name] || ''}
          onChange={(content: string) => handleChange(content)}
          className={`border border-[--shadow] rounded-lg transition-colors ${
            values[name] ? 'border-[--foreground] border-2' : ''
          }`}
        />
      </div>
      {extraInfo && <span className="text-gray-500 text-sm">{extraInfo}</span>}
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-xs mt-1">
          {errors[name] as string}
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
