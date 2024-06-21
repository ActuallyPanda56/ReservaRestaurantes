import { StaticImageData } from "next/image";

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
  [key: string]: string;
}

export interface RestuaurantData {
  name: string;
  address: string;
  phone: string[];
  email: string;
  schedule: string;
  reservations: {
    date: string;
    time: string;
    table: number;
    customer: string;
    status: string;
  }[];
}