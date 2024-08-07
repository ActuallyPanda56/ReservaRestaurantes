import { HttpMethods } from '@/components/constants/enums';
import axiosRequest from '@/utils/axiosRequest';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface RegisterData {
  email: string;
  isoCode: string;
  name: string;
  lastName: string;
  phoneCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const useRegisterForm = () => {
  const router = useRouter();

  const initialValues = {
    email: '',
    isoCode: 'CO',
    name: '',
    lastName: '',
    phoneCode: '+57',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    isoCode: Yup.string().required('ISO Code is required'),
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneCode: Yup.string().required('Phone Code is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{7,14}$/, 'Phone number must be between 7 and 14 digits')
      .required('Phone Number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  const formik = useFormik<RegisterData>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: RegisterData) => {
    const { email, name, lastName, password, phoneNumber } = data;
    console.log(data);
    try {
      /* axios
        .post('http://localhost:8081/v1/auth/register', {
          email,
          name,
          lastName,
          password,
          phoneNumber,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('Usuario creado exitosamente'); // Redirect to the desired page
            formik.resetForm();
            router.back();
          }
        })
        .catch((err) => {
          if (err.response.data.code === 402) {
            alert('El correo ya se encuentra registrado');
          } else {
            console.error('Error en la solicitud:', err);
            alert('Error en la solicitud'); // Show an error message to the user
          }
        }); */

      axiosRequest(HttpMethods.POST, '/auth/register', {
        email,
        name,
        lastName,
        password,
        phoneNumber,
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('userToken', res.data.token);
            formik.resetForm();
            router.back();
          }
        })
        .catch((err) => {
          if (err.response.data.code === 402) {
            alert('El correo ya se encuentra registrado');
          } else {
            console.error('Error en la solicitud:', err);
            alert('Error en la solicitud'); // Show an error message to the user
          }
        });
    } catch (error) {
      alert('Error en la solicitud');
    }
  };

  return formik;
};

export default useRegisterForm;
