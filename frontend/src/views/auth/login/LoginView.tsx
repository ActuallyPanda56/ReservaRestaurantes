import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginView() {
  const [usercol, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleSubmit(event: any) {
    event.preventDefault();
    axios.post('http://localhost:8081/login', { usercol, password })
      .then(res => {
        console.log(res);
        alert(res.data);  // Muestra la respuesta del servidor
        if (res.data === "Usuario reconocido") {
          router.push('/reservation');  // Redirige a la página en blanco
        }
      })
      .catch(err => {
        console.error('Error en la solicitud:', err);
        alert('Error en la solicitud');  // Muestra un mensaje de error al usuario
      });
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-custom'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="usercol" className='text-gold'>Email</label>
            <input type="text" placeholder='Enter Email' className='form-control'
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor="password" className='text-gold'>Password</label>
            <input type="password" placeholder='Enter Password' className='form-control'
              onChange={e => setPassword(e.target.value)} />
          </div>
          <button className='btn btn-danger'>Login</button>
        </form>
      </div>
    </div>
  );
}
