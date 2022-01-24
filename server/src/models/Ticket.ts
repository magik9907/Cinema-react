import {Seans} from "./Seans";
import { Discount } from "./Discount";

export interface Ticket{
    name: string;
    surname: string;
    discount: Discount;
    seans: Seans;
    seatNo: number;
    isDelete?:boolean
}