declare interface IProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  label?: string;
  trusted?: boolean;
  type: TProductType;
}

declare type TProductType =
  | "processor"
  | "motherboard"
  | "ram"
  | "storage"
  | "powerSupply"
  | "case"
  | "monitor";

declare module "react-speech-recognition";
