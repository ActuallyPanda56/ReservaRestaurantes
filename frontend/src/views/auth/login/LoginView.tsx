import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importa el componente Image de Next.js
import cuiImage from '@/image/cui.jpg'; // Importa la imagen

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post('http://localhost:8081/v1/auth/login', { email, password })
      .then((res) => {
        console.log(res);
        const message = res.data; // Obtén el mensaje de respuesta del servidor
        alert(message); // Muestra el mensaje al usuario
        if (message === 'Usuario reconocido') {
          router.push('/home'); // Redirige a la página en blanco si el usuario es reconocido
        }
      })
      .catch((err) => {
        console.error('Error en la solicitud:', err);
        alert('Error en la solicitud'); // Muestra un mensaje de error al usuario
      });
  }

  function handleRegister() {
    router.push('/selection');
  }

  return (
    <div className="flex w-screen relative h-screen bg-[#FFEAC9] p-8">
      <div className="flex-1 flex justify-start items-center">
        <div className="ml-16">
          <Image src={cuiImage} alt="Cui Image" width={500} height={500} className="object-cover" />
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 mr-16">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#A68263] font-semibold mb-2">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                className="form-control w-full p-2 border border-[#d3b091] rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#A68263] font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control w-full p-2 border border-[#d3b091] rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full mb-2" type="submit">
              Login
            </button>
            <button className="btn-primary w-full" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
