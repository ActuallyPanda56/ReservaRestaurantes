'use client';
import { userStore } from '@/store/user';
import React, { useEffect } from 'react';
import axios from 'axios';
import axiosRequest from '@/utils/axiosRequest';
import { HttpMethods } from './constants/enums';

export default function PageWrapper() {
  const updateUser = userStore((state: any) => state.updateUser);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const response = await axios.get('/api/refresh-session');
        const user = await axiosRequest(
          HttpMethods.GET,
          `/user/${response.data.user.id}`
        );

        const formattedData = {
          ...user.data,
          birthDate: user.data.birthDate.split('T')[0],
        };

        localStorage.setItem('userToken', response.data.token);
        updateUser(formattedData);
      } catch (error) {
        localStorage.removeItem('userToken');
        console.error('Error refreshing session', error);
      }
    };

    refreshSession();
  }, []);

  return <></>;
}
