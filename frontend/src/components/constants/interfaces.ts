import { StaticImageData } from "next/image";
import { RestaurantType } from "./enums";

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
  password: string;
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
  short_description?: string;
  banner: string;
  address: string;
  phone_number?: string[];
  email?: string;
  rating?: number;
  schedule?: string;
  age_restricted: boolean;
  menuPictures: string[];
  menuInfo: string[]
  pictures: string[];
  type: RestaurantType;
  reservations?: {
    date: string;
    time: string;
    table: number;
    customer: string;
    status: string;
  }[];
}