import { StaticImageData } from 'next/image';
import { RestaurantType } from './enums';

export interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  image: string | StaticImageData;
  rating?: number;
  age_restricted?: boolean;
}

export interface Restaurant {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  identification: string;
  birthDate: string;
  profilePicture: string;
  address: string;
  isRestaurantOwner: boolean;
}
export interface TableRow {
  [key: string]: string | number | string[];
}

export interface RestaurantData {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  short_description: string;
  banner: string;
  address: string;
  phone_number: string[];
  rating?: number;
  capacity: {
    table_capacity: number;
    table_count: number;
  }[];
  age_restricted: boolean;
  menu_pictures: string[];
  menu_info: {
    name: string;
    description: string;
    price: number;
  }[];
  pictures: string[];
  type: RestaurantType;

  // RELATIONS (RELATIONS DO NOT COME IN JSON FORMAT)
  reservations?: {
    date: string;
    time: string;
    table: number;
    customer: string;
    status: string;
  }[];

  schedule?: {
    day: string;
    start_time: string;
    end_time: string;
  }[];

  reviews?: {
    user_id: string;
    rating: number;
    title: string;
    description: string;
  }[];
}
