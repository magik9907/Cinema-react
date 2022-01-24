import { Request, Response, IRoute } from 'express';
import { HallModel } from '../../models/db/mongodb/schema/hall';
import { Hall } from '../../models/Hall';
import { PageControll } from '../PageController';
import HallId from './HallIdControll';
import HallNumber from './HallNumberControll';

type GetBodyType = { number: number };

export default class Halls extends PageControll {
  path = '/hall';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.post();
    this.router.use(this.path, new HallId().init());
    this.router.use(this.path, new HallNumber().init());
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Halls Get');
      HallModel.find()
        .where({ isDelete: false })
        .sort('number')
        .exec((err, result) => {
          if (err) {
            console.log(err);
            res.statusCode = 400;
            res.send({ error: 'Server error', data: Date.now });
          } else {
            console.log(result || 404);
            res.send(result || 404);
          }
        });
    });
  }

  post() {
    this.route.post(async (req: Request, res: Response) => {
      const body: Hall = req.body;
      console.log('Halls POST');
      console.log(body);
      if (body) {
        const doc = new HallModel(body);
        if (doc.validateSync()?.errors) {
          console.log(doc.errors);
          res.statusCode = 404;
          res.send(doc.errors);
        } else {
          await doc.save();
          res.statusCode = 200;
          res.send(doc);
        }
      } else {
        res.statusCode = 400;
        res.statusMessage = 'No valid body';
        res.send();
      }
    });
  }
}
