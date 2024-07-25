import { HttpMethods } from '@/components/constants/enums';
import { User } from '@/components/constants/interfaces';
import axiosRequest from '@/utils/axiosRequest';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const useProfileForm = () => {
  const router = useRouter();
  const initialValues = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    identification: '',
    birthDate: '',
    profilePicture: '',
    address: '',
    isRestaurantOwner: false,
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[a-zA-Z ]+$/, 'Name can only contain letters and spaces'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[a-zA-Z ]+$/, 'Last name can only contain letters and spaces'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number can only contain digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number cannot exceed 15 digits'),
    identification: Yup.string().matches(
      /^[a-zA-Z0-9]+$/,
      'Identification can only contain letters and numbers'
    ),
    birthDate: Yup.date()
      .nullable()
      .min(new Date(1900, 0, 1), 'Birth date must be after January 1, 1900')
      .max(new Date(), 'Birth date cannot be in the future'),
    profilePicture: Yup.string(),
    address: Yup.string().max(255, 'Address cannot exceed 255 characters'),
  });

  const formik = useFormik<User>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: User) => {
    const response = await axiosRequest(
      HttpMethods.PUT,
      `/user/update/${data.id}`,
      data
    );

    if (response.status === 200) {
      alert('Profile updated successfully');
      router.refresh();
    }

    if (response.status === 400) {
      alert('Error updating profile');
    }
  };

  return formik;
};

export default useProfileForm;
