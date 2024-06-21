'use client';

import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ImageUploader from '@/components/common/ImageUploader';
import { userStore } from '@/store/user';
import useProfileForm from './hooks/useProfileForm';
import { FormikProvider } from 'formik';
import Link from 'next/link';

export default function ProfileView() {
  const userData = userStore((state: any) => state.user);
  const formik = useProfileForm();

  return (
    <>
      <FormikProvider value={formik}>
        <div className="flex flex-col my-20 mx-20 pr-20 gap-20 w-full">
          <div className="w-full flex justify-between items-center pr-20">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-bold">Mi Perfil</h1>
              <p className="text-lg text-gray-600 pr-10">
                Completa tu perfil para que podamos ofrecerte la mejor
                experiencia en nuestra plataforma. Puedes cambiar tu información
                personal en cualquier momento.
              </p>
              <div className="text-lg text-gray-600 pr-10 flex gap-1">
                <p>Si quieres ver tus reservas, haz click</p>
                <Link
                  href="/profile/my-reservations"
                  className="text-orange-500 underline hover:text-orange-600"
                >
                  aquí
                </Link>
              </div>
              {userData.isRestaurantOwner && (
                <div className="text-lg text-gray-600 pr-10 flex gap-1">
                  <p>
                    Si quieres ver la información de tu restaurante, haz click
                  </p>
                  <Link
                    href="/profile/control-panel"
                    className="text-orange-500 underline hover:text-orange-600"
                  >
                    aquí
                  </Link>
                </div>
              )}
            </div>
            <div>
              <ImageUploader
                name="profilePicture"
                label="foto de perfil"
                circularCrop
                selectOnImage
              />
            </div>
          </div>

          <ProfileForm userData={userData} />
        </div>
      </FormikProvider>
    </>
  );
}
