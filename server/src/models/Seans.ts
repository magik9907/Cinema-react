import { DateTime } from './DateTime';
import { Film } from './film';
import { Hall } from './Hall';

export interface Seans {
  hall: Hall;
  film: Film;
  date: DateTime;
  endDate: DateTime;
  ticketPrice: Number;
  isDelete?:boolean
}
