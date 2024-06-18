import { StaticImageData } from "next/image";

export interface Restaurant {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  identification: string;
  birthDate: string;
  password: string;
  profilePicture: string;
  address: string;
}