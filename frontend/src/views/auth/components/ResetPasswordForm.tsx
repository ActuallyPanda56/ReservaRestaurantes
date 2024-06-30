// ResetPasswordForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Verificar el correo electrónico antes de proceder
      const emailCheckResponse = await axios.post('/api/check-email', { email });
      
      if (!emailCheckResponse.data.exists) {
        setError('El correo electrónico no está registrado');
        return;
      }

      // Proceder con el restablecimiento de contraseña
      const resetPasswordResponse = await axios.post('/api/reset-password', { token: emailCheckResponse.data.resetToken, password: newPassword, confirmPassword });
      
      setSuccessMessage(resetPasswordResponse.data.message);
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No se encontró la ruta para restablecer la contraseña');
      } else {
        console.error('Error al restablecer la contraseña:', error);
        setError('Error al procesar la solicitud');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="newPassword">Nueva contraseña:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <div className="text-red-500">{error}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
