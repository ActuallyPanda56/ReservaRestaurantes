import React, { useState } from 'react';
import { Field, Formik, Form } from 'formik'; // Asegúrate de importar correctamente desde Formik
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, actions) => {
    const { email, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const emailCheckResponse = await axios.post('/v1/api/check-email', { email });

      if (!emailCheckResponse.data.exists) {
        setError('El correo electrónico no está registrado');
        return;
      }

      const resetPasswordResponse = await axios.post('/v1/api/reset-password', {
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
      <Formik
        initialValues={{ email: '', newPassword: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <label htmlFor="email">Correo electrónico:</label>
            <Field
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="newPassword">Nueva contraseña:</label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <Field
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
