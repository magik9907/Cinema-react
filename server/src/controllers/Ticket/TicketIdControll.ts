import { Request, Response, IRoute } from 'express';
import { TicketModel } from '../../models/db/mongodb/schema/ticket';
import { Ticket } from '../../models/Ticket';
import { PageControll } from '../PageController';

export default class TicketId extends PageControll {
  path = '/id';
  route: IRoute = this.router.route(this.path);
  init() {
    this.get();
    this.put();
    this.delete();
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Ticket GET');
      const { id } = req.query;
      console.log(id);
      TicketModel.findById(id)
        .exec((err: any, ticket: any) => {
          console.log(ticket);
          if (err) {
            console.log(`404: ${id} ` + err);
            res.statusCode = 404;
            res.send(err);
          }
          res.send(ticket || 404);
        });
    });
  }

  put() {
    this.route.put(async (req: Request, res: Response) => {
      const {
        params: { TicketId },
        body,
      } = req;
      console.log('Ticket PUT');
      console.log(TicketId, body);TicketModel.findByIdAndUpdate(
        { _id: TicketId },
        body,
        (err: any, result: Ticket) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('Ticket discount ', TicketId, result);
            res.statusCode = (result && 200) || 404;
            res.send(result || 404);
          }
        }
      );
    });
  }

  delete() {
    this.route.delete((req: Request, res: Response) => {
      const {
        params: { TicketId },
      } = req;
      console.log('Ticket delete');
      console.log(TicketId);
TicketModel.findByIdAndDelete(TicketId, (err: any, ticket: Ticket) => {
        if (err) {
          console.log(err);
          res.statusCode = 404;
          res.send(err);
        } else {
          console.log('deleted Ticket ', TicketId, ticket);
          res.statusCode = 200 || 404;
          res.send(ticket || 404);
        }
      });
    });
  }
}
