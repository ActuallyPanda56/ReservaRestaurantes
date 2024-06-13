import { StaticImageData } from "next/image";

export interface Restaurant {
  title: string;
  description: string;
  image: string | StaticImageData;
}