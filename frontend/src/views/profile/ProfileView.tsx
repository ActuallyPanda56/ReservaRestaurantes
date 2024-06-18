'use client';

import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ImageUploader from '@/components/common/ImageUploader';
import { userStore } from '@/store/user';
import useProfileForm from './hooks/useProfileForm';
import { FormikProvider } from 'formik';

export default function ProfileView() {
  const userData = userStore((state: any) => state.user);
  const formik = useProfileForm();

  return (
    <>
      <FormikProvider value={formik}>
        <div className="flex flex-col my-40 mx-20 pr-20 gap-20 w-full">
          <div className="w-full flex justify-between">
            <h1 className="text-5xl font-bold">My Profile</h1>
            <ImageUploader
              name="profilePicture"
              label="foto de perfil"
              circularCrop
              selectOnImage
            />
          </div>
          <ProfileForm userData={userData} />
        </div>
      </FormikProvider>
    </>
  );
}
