'use client';

import 'react-image-crop/dist/ReactCrop.css';

import { FormikValues, useFormikContext } from 'formik';
import React, { use, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoClose } from 'react-icons/io5';
import { MdUpload } from 'react-icons/md';
import ReactCropper, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  PercentCrop,
} from 'react-image-crop';

import { AspectRatio } from '@/components/constants/enums';

interface ImageUploaderProps {
  aspectRatio?: AspectRatio;
  label?: string;
  name: string;
  customLabel?: React.ReactNode;
  extraInfo?: string;
  circularCrop?: boolean;
  selectOnImage?: boolean;
}

export default function ImageUploader({
  aspectRatio = AspectRatio.square,
  label,
  name,
  customLabel,
  extraInfo,
  circularCrop = false,
  selectOnImage = false,
}: ImageUploaderProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [imageCropped, setImageCropped] = useState(false);
  const [crop, setCrop] = useState<any>();
  const [imageUrl, setImageUrl] = useState('' as string);
  const imageRef = useRef<HTMLImageElement>(null);
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: any }
  >();
  const [isPictureOpen, setIsPictureOpen] = useState(false);
  const { values } = formikContext;

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: (Files) => {
      setFiles(
        Files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))
      );
      setImageCropped(false);
    },
  });

  const onImageLoad = (event: any) => {
    const { width, height } = event.currentTarget;
    const newCrop = makeAspectCrop(
      {
        unit: '%',
        height: 100,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(newCrop, width, height);
    setCrop(centeredCrop);
  };

  const getCroppedImg = async (
    image: HTMLImageElement,
    cropped: PercentCrop,
    fileName: string
  ) => {
    const pixelCrop = convertToPixelCrop(
      cropped,
      image.naturalWidth,
      image.naturalHeight
    );
    const { x, y, width, height } = pixelCrop;

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    const croppedImageUrl = await new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          reject();
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          resolve(base64Data);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    });

    setFiles([
      {
        file: new File([croppedImageUrl], fileName),
        preview: croppedImageUrl,
      },
    ]);
    setImageCropped(true);
  };

  const confirmImage = () => {
    formikContext.setFieldValue(name, files[0].preview);
    URL.createObjectURL(files[0].file);
    setIsPictureOpen(false);
  };

  const thumbs = files.map(({ file, preview }) => {
    return (
      <div className="flex border mb-2 mr-2 p-4" key={file.name}>
        <div className="flex overflow-hidden">
          <picture>
            <img
              alt="Preview"
              src={preview}
              width={200}
              height={200}
              className={`${circularCrop && 'rounded-full'}`}
              onLoad={() => {
                URL.revokeObjectURL(preview);
              }}
            />
          </picture>
        </div>
      </div>
    );
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(({ preview }) => URL.revokeObjectURL(preview));
  }, []);

  return (
    <>
      <div className="flex gap-2 flex-col w-full max-w-[500px] items-start">
        {customLabel
          ? customLabel
          : label && (
              <span className="text-gray-500 text-sm font-bold">{label}</span>
            )}

        <div
          className={`flex ${
            aspectRatio === AspectRatio.square
              ? 'aspect-square max-w-[200px]'
              : 'aspect-video'
          } w-full bg-gray-300 items-center justify-center relative ${
            circularCrop && 'rounded-full'
          } ${selectOnImage && 'cursor-pointer'}`}
          onClick={() => {
            selectOnImage && setIsPictureOpen(true);
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {selectOnImage && (
            <div
              className={`w-full h-full bg-black bg-opacity-60 absolute flex items-center justify-center ${
                !isHovering && 'hidden'
              }
              ${circularCrop && 'rounded-full'}`}
            >
              <span className="text-white text-sm">
                Cambia tu foto de perfil
              </span>
            </div>
          )}
          {values[name] !== '' ? (
            <picture>
              <img
                src={values[name] as string}
                alt="banner"
                className={`object-cover w-full h-full ${
                  circularCrop && 'rounded-full'
                }`}
              />
            </picture>
          ) : (
            <span
              className={`text-gray-500 text-sm ${
                isHovering && selectOnImage && 'hidden'
              }`}
            >
              No hay imagen
            </span>
          )}
        </div>

        {
          // Extra info
          extraInfo && (
            <span className="text-gray-500 text-sm">{extraInfo}</span>
          )
        }
        {!selectOnImage && (
          <button
            className="btn-primary text-white p-2 rounded-2xl w-full max-w-32 hover:bg-primary-foreground hover:scale-105 transition-all"
            type="button"
            onClick={() => setIsPictureOpen(true)}
          >
            Subir imagen
          </button>
        )}

        {
          // Error message
          typeof formikContext.errors[name] === 'string' && (
            <span className="text-red-500 text-sm">
              {String(formikContext.errors[name])}
            </span>
          )
        }
      </div>
      <div
        onMouseDown={() => setIsPictureOpen(false)}
        className={`fixed inset-0 h-screen w-screen flex gap-5 items-center justify-center bg-black bg-opacity-50 z-20 ${
          !isPictureOpen && 'hidden'
        }`}
      >
        <div
          onMouseDown={(event) => event.stopPropagation()}
          className="relative flex flex-col bg-white p-4 rounded-lg gap-4 z-30 w-[500px]"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="font-bold">¡Sube tu imagen!</span>
              <span className="text-sm text-gray-600">
                Sube la imagen para tu {label}, recuerda que solo puedes subir
                un archivo.
              </span>
            </div>
            <button className="p-1" type="button">
              <IoClose onClick={() => setIsPictureOpen(false)} className="" />
            </button>
          </div>
          <div className="flex mx-4 flex-col border-dashed border-2 border-[--foreground] rounded-lg items-center text-gray-400 hover:text-primary-foreground hover:border-primary hover:scale-105 transition-all cursor-pointer">
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="flex h-full w-full items-center justify-center py-10 gap-2"
            >
              <input {...getInputProps()} className="" />
              <MdUpload />
              <p className="w-[300px]">
                Arrastra tus archivos aquí, o haz click para seleccionarlos
              </p>
            </div>
            {fileRejections.length > 0 && (
              <span className="text-red-500">
                {fileRejections[0].errors[0].message === 'Too many files'
                  ? 'Solo puedes subir un archivo'
                  : fileRejections[0].errors[0].message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative flex justify-center text-gray-600 text-sm">
              <div className="w-full border-t border-gray-300 mt-[10px] absolute" />
              <span className="bg-white z-40 px-2">O también...</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 font-bold px-2">
                Sube tu imagen por URL
              </span>
              <div className="flex gap-4 text-gray-600 text-sm">
                <input
                  type="text"
                  onChange={(event) => setImageUrl(event.target.value)}
                  value={imageUrl}
                  placeholder="Añade la URL de tu imagen"
                  className="border rounded-lg p-3 w-full max-w-[300px]  outline-none focus:ring-2 focus:ring-[--foreground] focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={() => {
                    // validate url with RegEx
                    if (
                      !imageUrl.match(
                        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/
                      )
                    )
                      return alert('URL inválida');
                    setFiles([
                      {
                        file: new File([], 'image'),
                        preview: imageUrl,
                      },
                    ]);

                    setImageUrl('');
                  }}
                  type="button"
                  className="btn-primary hover:text-white transition-all scale-105 rounded-lg"
                >
                  Subir
                </button>
              </div>
              {files.length > 0 && (
                <div>
                  <span className="text-gray-500 font-bold px-2 text-sm">
                    Tus archivos subidos:
                  </span>
                  <div className="flex flex-col items-center">{thumbs}</div>
                </div>
              )}
              {
                // Confirmar imagen
                imageCropped && (
                  <button
                    onClick={confirmImage}
                    className="btn-primary text-white py-2 px-5 rounded-lg hover:scale-105 transition-all"
                    type="button"
                  >
                    Confirmar imagén
                  </button>
                )
              }
            </div>
          </div>
        </div>

        {files.length > 0 && !imageCropped && (
          <div
            onMouseDown={(event) => event.stopPropagation()}
            className={`relative flex flex-col bg-white p-6 rounded-lg gap-4 z-30 max-w-[500px] `}
          >
            <div className="flex">
              <div className="flex flex-col">
                <span className="font-bold">Recorta tu imagen</span>
                <span className="text-sm text-gray-600">
                  Recorta tu imagen para que se ajuste al formato de tu {label}.
                </span>
              </div>
            </div>
            <div className="h-full w-full flex items-center justify-center z-50 rounded-lg">
              <ReactCropper
                crop={crop}
                aspect={aspectRatio}
                onChange={(pixelCrop, percentCrop) => {
                  setCrop(percentCrop);
                }}
                circularCrop={circularCrop}
              >
                <picture>
                  <img
                    ref={imageRef}
                    src={
                      files.length > 0
                        ? files.length === 2
                          ? files[1].preview
                          : files[0].preview
                        : imageUrl
                    }
                    alt="Image"
                    onLoad={(e) => {
                      if (files.length > 0) {
                        URL.revokeObjectURL(files[0].preview);
                      }
                      onImageLoad(e);
                    }}
                    className="object-cover w-full h-full"
                  />
                </picture>
              </ReactCropper>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  getCroppedImg(
                    imageRef.current as HTMLImageElement,
                    crop,
                    files[0].file.name
                  );
                }}
                type="button"
                className="btn-primary text-white py-1 px-5 rounded-lg hover:scale-105 transition-all"
              >
                Recortar
              </button>
              {files.length === 2 && (
                <button
                  onClick={() => {
                    setIsPictureOpen(false);
                  }}
                  type="button"
                  className="btn-primary text-white py-1 px-5 rounded-lg hover:scale-105 transition-all"
                >
                  Guardar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
