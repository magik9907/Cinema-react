import { Request, Response, IRoute } from 'express';
import { HallModel } from '../../models/db/mongodb/schema/hall';
import { Hall } from '../../models/Hall';
import { PageControll } from '../PageController';

export default class HallNumber extends PageControll {
  path = '/number/:number';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    return this.router;
  }

  get() {
    this.route.get(async (req: Request, res: Response) => {
      console.log('Hall POST by room');
      console.log(req.params);
      const {
        params: { number },
      } = req;
      const value = parseInt(number);
      if (!number || isNaN(value)) {
        res.statusCode = 400;
        res.send('Body must contains {number:number}');
      } else {
        HallModel.find({ number: value }, (err: any, hall: Hall[]) => {
          if (err) {
            console.log(`404: ${value} ` + err);
            res.statusCode = 404;
            res.send(err);
          }
          console.log(hall);
          res.send(hall);
        });
      }
    });
  }
}
