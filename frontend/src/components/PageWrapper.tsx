'use client';
import { userStore } from '@/store/user';
import React, { useEffect } from 'react';

export default function PageWrapper({ response }: { response: any }) {
  const updateUser = userStore((state: any) => state.updateUser);

  return <></>;
}
