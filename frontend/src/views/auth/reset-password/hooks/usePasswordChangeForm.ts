import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface PasswordChange {
  password: string;
    confirmPassword: string;
}

const useEmailForm = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es requerida'),
  });

  const formik = useFormik<PasswordChange >({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: PasswordChange ) => {
    try {
      axios
        .post('http://localhost:8081/v1/auth/check-email', data)
        .then((res) => {
          if (res.status === 200) {
            // Lógica de éxito
            alert("El Correo Existe"); // Redirect to the desired page
          }
        })
        .catch((err) => {
            // Lógica de error
          console.error('Error en la solicitud:', err);
        });
    } catch (error) {
      alert('Error en la solicitud');
    }
  };

  return formik;
};

export default useEmailForm;
