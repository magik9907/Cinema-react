import {Seans} from "./Seans";
import { Discount } from "./Discount";

export interface Ticket{
    _id?: string; 
    name: string;
    surname: string;
    discount?: Discount;
    seans: Seans;
    seatNo: number;
}

