// En el componente LoginForm.js (o donde estés manejando el inicio de sesión)
import React, { useState } from 'react';
import { Field, FormikProvider, ErrorMessage } from 'formik';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import axios from 'axios';

export default function LoginForm({ setShowResetPasswordForm }) {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [error, setError] = useState('');

  const handleForgotPasswordClick = async () => {
    try {
      const emailCheckResponse = await axios.post('/v1/api/check-email', { email });
      setEmailExists(emailCheckResponse.data.exists);

      if (!emailCheckResponse.data.exists) {
        setError('El correo electrónico no está registrado');
      } else {
        setShowResetPasswordForm(true); // Mostrar formulario de restablecimiento de contraseña
      }
    } catch (error) {
      console.error('Error al verificar el correo electrónico:', error);
      setError('Error al procesar la solicitud');
    }
  };

  return (
    <FormikProvider>
      <div className="flex flex-col justify-between h-full py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="flex relative items-center gap-2 px-2 border-b transition-all">
              <Field
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-full focus:outline-none text-sm placeholder:tracking-tight py-2 placeholder:text-gray-600"
              />
            </div>
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        </div>
        <button type="button" onClick={handleForgotPasswordClick} className="btn-primary">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </FormikProvider>
  );
}
