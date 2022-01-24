import { Request, Response, IRoute } from 'express';
import { DiscountModel } from '../../models/db/mongodb/schema/discount';
import { PageControll } from '../PageController';
import DiscountId from './DiscountIdControll';

export default class Discount extends PageControll {
  path = '/discount';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.post();

    this.router.use(this.path, new DiscountId().init());

    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      DiscountModel.find()
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
      const body = req.body;
      console.log('DISCOUNT POST');
      console.log(body);
      if (body.length > 0 && body.title) {
        const doc = new DiscountModel(body);
        await doc.save();
        res.statusCode = 200;
        res.send(doc);
      } else {
        res.statusCode = 400;
        res.statusMessage = 'No valid body';
        res.send();
      }
    });
  }
}