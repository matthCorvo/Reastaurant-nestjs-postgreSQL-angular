import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";
import { User } from "./User";

export class Order{
  id!:number;
  order!: CartItem[];
  totalPrice!:number;
  name!: string;
  adresse!: string;
  paymentId!: boolean;
  addressLatLng?:LatLng;
  createdAt!: string;
  status!: string;
  userId!:number;
}