import axios from 'axios';
import { cookies } from 'next/headers';

export const refreshSession = async () => {
  const token = cookies().get('userToken');

  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(
      'http://localhost:8081/v1/auth/refresh-session',
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Session refreshed');
    return response;
  } catch (error) {
    throw new Error("Couldn't refresh session");
  }
};
