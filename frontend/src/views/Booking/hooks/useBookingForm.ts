import { BookingStatus, HttpMethods } from '@/components/constants/enums';
import axiosRequest from '@/utils/axiosRequest';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface BookingData {
  userId: string;
  restaurantId: string;
  bearerName: string;
  status: BookingStatus;
  adults: number;
  children: number;
  price: number;
  date: Date | string;
  startTime: string; // Changed to string to match MySQL TIME
  endTime: string; // Changed to string to match MySQL TIME
}

const useBookingForm = () => {
  const router = useRouter();
  const initialValues: BookingData = {
    userId: '',
    restaurantId: '',
    bearerName: '',
    status: BookingStatus.pending,
    adults: 1,
    children: 0,
    price: 0,
    date: '',
    startTime: '',
    endTime: '',
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    restaurantId: Yup.string().required('Restaurant ID is required'),
    bearerName: Yup.string().required('Bearer name is required'),
    adults: Yup.number()
      .min(1, 'At least one adult is required')
      .required('Number of adults is required'),
    children: Yup.number()
      .min(0, 'Number of children cannot be negative')
      .required('Number of children is required'),
    date: Yup.date()
      .min(new Date(), 'Date cannot be in the past')
      .required('Date is required'),
    startTime: Yup.string()
      .required('Start time is required')
      .test(
        'is-before-end-time',
        'Start time must be before end time',
        function (value) {
          const { endTime } = this.parent;
          return (
            value &&
            endTime &&
            new Date(`1970-01-01T${value}Z`).getTime() <
              new Date(`1970-01-01T${endTime}Z`).getTime()
          );
        }
      ),
    endTime: Yup.string().required('End time is required'),
  });

  const formik = useFormik<BookingData>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: BookingData) => {
    // Format times before sending to the server
    try {
      const res = await axiosRequest(HttpMethods.POST, '/booking/create', data);
      if (res.status === 200) {
        alert('Booking created successfully');
        router.push(`/profile/my-reservations`);
      }
      if (res.status === 406) {
        alert('Booking failed. Not enough Capacity');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return formik;
};

export default useBookingForm;
