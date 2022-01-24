import { Request, Response, IRoute } from 'express';
import { SeansModel } from '../../models/db/mongodb/schema/seans';
import { Seans } from '../../models/Seans';
import { PageControll } from '../PageController';

/**
 * @path /api/seans/id?id=[seansId]
 */

export default class SeansId extends PageControll {
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
      console.log('Seans GET');
      const { id } = req.query;
      console.log(id);
      SeansModel.findById(id)
        .populate('hall film')
        .exec((err: any, seans: any) => {
          if (err) {
            console.log(`404: ${id} ` + err);
            res.statusCode = 404;
            res.send(err);
          }
          console.log(seans);
          res.send(seans || 404);
        });
    });
  }

  put() {
    this.route.put(async (req: Request, res: Response) => {
      const {
        query: { id },
        body,
      } = req;
      console.log('Seans PUT', id);
      console.log(id, body);
      SeansModel.findByIdAndUpdate(
        { _id: id },
        body,
        (err: any, result: Seans) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('updated seans ', id, result);
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
        query: { id },
      } = req;
      console.log('Seans delete');
      console.log(id);

      SeansModel.findByIdAndUpdate(id, { isDelete: true }).exec(
        (err, Seans) => {
          if (err) {
            console.log(err);
            res.statusCode = 404;
            res.send(err);
          } else {
            console.log('deleted Seans ', id, Seans);
            res.statusCode = 200 || 404;
            res.send(Seans || 404);
          }
        }
      );
    });
  }
}
