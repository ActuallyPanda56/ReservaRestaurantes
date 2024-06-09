'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

  export default function RegisterView() {
    const [name, setname] = useState('');
    const [last_name, setLast_name] = useState('');
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
        .post('http://localhost:8081/record', {
          name,
          last_name,
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
    <div className="d-flex vh-100 justify-content-center align-items-center bg-custom">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="text-gold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control"
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="text-gold">
            Last name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="form-control"
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="text-gold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-gold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="text-gold">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-danger">Register</button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
