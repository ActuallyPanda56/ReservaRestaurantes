import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Email {
  email: string;
}

const useEmailForm = () => {
  const initialValues = {
    email: '',
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  const formik = useFormik<Email>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: Email) => {
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
