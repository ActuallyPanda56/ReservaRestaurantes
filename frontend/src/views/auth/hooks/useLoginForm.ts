import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginData {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik<LoginData>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: LoginData) => {
    const { email, password } = data;
    try {
      axios
        .post('http://localhost:8081/v1/auth/login', { email, password })
        .then((res) => {
          console.log(res);
          alert(res.data); // Show the server response
          if (res.data === 'Usuario reconocido') {
            alert("Inicio de sesión Correcto. Implementar backend"); // Redirect to the desired page
          }
        })
        .catch((err) => {
          console.error('Error en la solicitud:', err);
          alert('Error en la solicitud'); // Show an error message to the user
        });
      formik.resetForm();
    } catch (error) {
      alert('Error en la solicitud');
    }
  };

  return formik;
};

export default useLoginForm;
