import { RestaurantType } from '@/components/constants/enums';
import { userStore } from '@/store/user';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface RestaurantRegisterData {
  userId: string;
  name: string;
  description: string;
  shortDescription: string;
  banner: string;
  pictures: string[];
  phoneNumber: string[];
  menuPicture: string;
  menuInfo: {
    name: string;
    description: string;
    price: number;
  }[];
  type: RestaurantType;
  address: string;
  capacity: {
    tableCapacity: number | string;
    tableCount: number | string;
  }[];
  ageRestricted: boolean;
}

const useRestaurantRegisterForm = () => {
  const userId = userStore((state: any) => state.user?.id);
  const router = useRouter();

  const initialValues: RestaurantRegisterData = {
    userId: userId,
    name: '',
    description: '',
    shortDescription: '',
    banner: '',
    pictures: [],
    phoneNumber: [],
    menuPicture: '',
    menuInfo: [],
    type: RestaurantType.restaurant,
    address: '',
    capacity: [
      {
        tableCapacity: 1,
        tableCount: 1,
      },
    ],
    ageRestricted: false,
  };

  // Define the Yup validation schema
  const validationSchema = Yup.object({
    userId: Yup.string(),
    name: Yup.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(60, 'El nombre no debe superar los 60 caracteres')
      .required('El nombre es obligatorio'),
    description: Yup.string().min(
      10,
      'La descripción debe tener al menos 10 caracteres'
    ),
    shortDescription: Yup.string().max(
      255,
      'La descripción corta no debe superar los 255 caracteres'
    ),
    banner: Yup.string().required('El banner es obligatorio'),
    pictures: Yup.array().of(Yup.string()),
    phoneNumber: Yup.array()
      .of(
        Yup.string()
          .matches(/^\d+$/, 'El número de teléfono solo puede contener números')
          .test(
            'unique',
            'Los números de teléfono no deben repetirse',
            function (value) {
              const phoneNumbers = this.parent;
              const duplicates = phoneNumbers.filter(
                (v: string) => v === value
              );
              return duplicates.length === 1;
            }
          )
          .min(7, 'El número de teléfono debe tener al menos 7 caracteres')
          .max(15, 'El número de teléfono no debe superar los 15 caracteres')
      )
      .min(1, 'Debe incluir al menos un número de teléfono'),
    menuInfo: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .min(3, 'El nombre del plato debe tener al menos 3 caracteres')
            .required('El nombre del plato es obligatorio')
            .test(
              'unique',
              'Los nombres de los platos no deben repetirse',
              function (value) {
                const menuInfo = this.parent;
                const duplicates = menuInfo.filter(
                  (v: { name: string }) => v.name === value
                );
                return duplicates.length === 1;
              }
            ),
          description: Yup.string()
            .min(
              10,
              'La descripción del plato debe tener al menos 10 caracteres'
            )
            .required('La descripción del plato es obligatoria'),
          price: Yup.number()
            .min(0, 'El precio debe ser un valor positivo')
            .required('El precio es obligatorio'),
        })
      )
      .min(1, 'Debe incluir al menos un plato en el menú'),
    type: Yup.string().required('El tipo de restaurante es obligatorio'),
    address: Yup.string()
      .min(10, 'La dirección debe tener al menos 10 caracteres')
      .required('La dirección es obligatoria'),
    capacity: Yup.array()
      .of(
        Yup.object().shape({
          tableCapacity: Yup.number()
            .typeError('La capacidad de la mesa debe ser un número')
            .min(1, 'La capacidad de la mesa debe ser al menos 1')
            .required('La capacidad de la mesa es obligatoria'),
          tableCount: Yup.number()
            .typeError('La cantidad de mesas debe ser un número')
            .min(1, 'La cantidad de mesas debe ser al menos 1')
            .required('La cantidad de mesas es obligatoria'),
        })
      )
      .min(1, 'Debe haber al menos una capacidad de mesa')
      .required('La capacidad es obligatoria'),
    ageRestricted: Yup.boolean().required(
      'La restricción de edad es obligatoria'
    ),
  });

  const formik = useFormik<RestaurantRegisterData>({
    initialValues,
    validationSchema,
    onSubmit: (data) => handleSubmit(data),
  });

  const handleSubmit = async (data: RestaurantRegisterData) => {
    if (!data.userId) {
      alert('Error al obtener el usuario'); // Show an error message to the user
      router.push('/auth');
    }
    console.log(data);
    try {
      axios
        .post('http://localhost:8081/v1/restaurant/create', data)
        .then((res) => {
          if (res.status === 200) {
            alert('Restaurante creado exitosamente'); // Redirect to the desired page
            formik.resetForm();
            router.push('/profile/control-panel');
          }
        })
        .catch((err) => {
          console.error('Error en la solicitud:', err);
          alert('Error en la solicitud'); // Show an error message to the user
        });
    } catch (error) {
      alert('Error en la solicitud');
    }
  };

  return formik;
};

export default useRestaurantRegisterForm;
