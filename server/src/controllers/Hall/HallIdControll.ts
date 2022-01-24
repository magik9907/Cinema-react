import { Request, Response, IRoute } from 'express';
import { HallModel } from '../../models/db/mongodb/schema/hall';
import { Hall } from '../../models/Hall';
import { PageControll } from '../PageController';

export default class HallId extends PageControll {
  path = '/id/:hallId';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.put();
    this.delete();
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Hall GET');
      const id = req.params['hallId'];
      console.log(id, req.params);
      HallModel.findById(id, (err: any, hall: Hall) => {
        if (err) {
          console.log(`404: ${id} ` + err);
          res.statusCode = 404;
          res.send(err);
        }
        res.send(hall || 404);
      });
    });
  }

  put() {
    this.route.put(async (req: Request, res: Response) => {
      const {
        params: { hallId },
        body,
      } = req;
      console.log('Hall PUT');
      console.log(hallId, body);
      HallModel.findByIdAndUpdate(
        { _id: hallId },
        body,
        (err: any, result: Hall) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('updated hall ', hallId, result);
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
        params: { hallId },
      } = req;
      console.log('Hall delete');
      console.log(hallId);

      HallModel.findByIdAndUpdate(hallId, { isDelete: true }).exec(
        (err, Hall) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('deleted Hall ', hallId, Hall);
            res.statusCode = 200 || 404;
            res.send(Hall || 404);
          }
        }
      );
    });
  }
}
