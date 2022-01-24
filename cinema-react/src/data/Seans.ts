import { DateTime } from './DateTime';
import { Film } from './Film';
import { Hall } from './Hall';

export interface Seans {
  _id?: string;
  hall: Hall;
  film: Film;
  date: DateTime;
  endDate: DateTime;
  ticketPrice: Number;
}
