import { Request, Response, IRoute } from 'express';
import { DiscountModel } from '../../models/db/mongodb/schema/discount';
import { Discount } from '../../models/Discount';
import { PageControll } from '../PageController';

export default class DiscountId extends PageControll {
  path = '/:DiscountId';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.put();
    this.delete();
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Discount GET');
      const id = req.params['DiscountId'];
      console.log(id, req.params);
      if (id === 'null') res.send({});
      DiscountModel.findById(id, (err: any, discount: Discount) => {
        if (err) {
          console.log(`404: ${id} ` + err);
          res.statusCode = 404;
          res.send(err);
        }
        res.send(discount || 404);
      });
    });
  }

  put() {
    this.route.put(async (req: Request, res: Response) => {
      const {
        params: { DiscountId },
        body,
      } = req;
      console.log('Discount PUT');
      console.log(DiscountId, body);
      DiscountModel.findByIdAndUpdate(
        { _id: DiscountId },
        body,
        (err: any, result: Discount) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('updated discount ', DiscountId, result);
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
        params: { DiscountId },
      } = req;
      console.log('Discount delete');
      console.log(DiscountId);

      DiscountModel.findByIdAndDelete(
        DiscountId,
        (err: any, discount: Discount) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('deleted discount ', DiscountId, discount);
            res.statusCode = 200 || 404;
            res.send(discount || 404);
          }
        }
      );
    });
  }
}
