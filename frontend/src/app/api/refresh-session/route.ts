import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('userToken')?.value;

  if (!token) {
    return NextResponse.json('Token not found');
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

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error refreshing session', error);
    const response = NextResponse.json("Couldn't refresh session");
    response.cookies.delete('userToken');
    return response;
  }
}
