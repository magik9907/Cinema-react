import { Request, Response, IRoute } from 'express';
import { FilmModel } from '../../models/db/mongodb/schema/film';
import { PageControll } from '../PageController';
import FilmId from './FilmIdControll';

export default class Film extends PageControll {
  path = '/film';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.post();
    this.router.use(this.path, new FilmId().init());

    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      FilmModel.find()
        .where({ isDelete: { $eq: false } })
        .sort('title')
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
      console.log('FILM POST');
      console.log(body);
      if (body.length > 0 && body.title) {
        const doc = new FilmModel(body);
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
