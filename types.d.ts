declare interface IProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
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
