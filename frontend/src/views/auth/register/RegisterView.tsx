'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importa el componente Image de Next.js
import cuiImage from '@/image/cui.jpg'; // Importa la imagen

export default function RegisterView() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios
      .post('http://localhost:8081/v1/auth/register', {
        name,
        last_name: lastName,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res);
        alert(res.data); // Muestra la respuesta del servidor
        if (res.data === 'Usuario reconocido') {
          router.push('/'); // Redirige a la página en blanco
        }
      })
      .catch((err) => {
        console.error('Error en la solicitud:', err);
        alert('Error en la solicitud');
      });
  };

  function handleCancel() {
    router.push('/auth/login');
  }

  return (
    <div className="flex  w-screen relative h-screen bg-[#FFEAC9] p-8">
      <div className="flex-1 flex justify-start items-center">
        <div className="ml-16">
          <Image src={cuiImage} alt="Cui Image" width={500} height={500} className="object-cover" />
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 mr-16">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[#A68263] font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control w-full p-2 border border-[#d3b091] rounded"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-[#A68263] font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="form-control w-full p-2 border border-[#d3b091] rounded"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#A68263] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-[#A68263] font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control w-full p-2 border border-[#d3b091] rounded"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full mb-2" type="submit">
              Register
            </button>
            <button className="btn-primary w-full" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
