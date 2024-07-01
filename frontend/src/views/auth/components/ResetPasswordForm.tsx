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
      // Verificar si el correo electrónico está registrado
      const emailCheckResponse = await axios.post<{ exists: boolean }>('/v1/check-email', { email });

      if (!emailCheckResponse.data.exists) {
        setError('El correo electrónico no está registrado');
        return;
      }

      // Proceder con el restablecimiento de contraseña
      const resetPasswordResponse = await axios.post('/v1/reset-password', {
        token: '', // Ajustar aquí el token si es necesario
        password: newPassword,
        confirmPassword: confirmPassword
      });

      setSuccessMessage(resetPasswordResponse.data.message);
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setError('Error al procesar la solicitud');
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
