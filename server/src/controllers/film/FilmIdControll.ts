import { Request, Response, IRoute } from 'express';
import { FilmModel } from '../../models/db/mongodb/schema/film';
import { Film } from '../../models/film';
import { PageControll } from '../PageController';

export default class FilmId extends PageControll {
  path = '/:filmId';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.put();
    this.delete();
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Film GET');
      const id = req.params['filmId'];
      console.log(id, req.params);
      FilmModel.findById(id, (err: any, film: Film) => {
        if (err) {
          console.log(`404: ${id} ` + err);
          res.statusCode = 404;
          res.send(err);
        }
        res.send(film || 404);
      });
    });
  }

  put() {
    this.route.put(async (req: Request, res: Response) => {
      const {
        params: { filmId },
        body,
      } = req;
      console.log('Film PUT');
      console.log(filmId, body);
      FilmModel.findByIdAndUpdate(
        { _id: filmId },
        body,
        (err: any, result: Film) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('updated film ', filmId, result);
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
        params: { filmId },
      } = req;
      console.log('Film delete');
      console.log(filmId);

      FilmModel.findByIdAndUpdate(filmId, { isDelete: true }).exec(
        (err, film) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('deleted film ', filmId, film);
            res.statusCode = 200 || 404;
            res.send(film || 404);
          }
        }
      );
    });
  }
}
