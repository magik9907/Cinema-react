import { json, urlencoded } from 'body-parser';
import { Application } from 'express';
import Films from './film/filmsControll';
import Halls from './Hall/HallsControll';
import Seans from './Seans/SeansControll';
import Discount from './Discount/DiscountControll';
import Ticket from './Ticket/TicketController';

export default class Api {
  app: Application;
  constructor(app: Application) {
    this.app = app;
    this.bodyParser();
  }
  init() {
    this.app.use('/api', new Films().init());
    this.app.use('/api', new Halls().init());
    this.app.use('/api', new Seans().init());
    this.app.use('/api', new Discount().init());
    this.app.use('/api', new Ticket().init());
  }

  private bodyParser() {
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
  }
}
