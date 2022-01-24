import { Request, Response, IRoute } from 'express';
import mongoose from 'mongoose';
import { TicketModel } from '../../models/db/mongodb/schema/ticket';
import { PageControll } from '../PageController';

/**
 * @path /api/seans/popular?id=[seansId]
 */

export default class SeansPopular extends PageControll {
  path = '/popular';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    return this.router;
  }

  get() {
    this.route.get((req: Request, res: Response) => {
      console.log('Seans Popular');
      const { id } = req.query;

      let objid = new mongoose.Types.ObjectId(id as string);
      console.log(id, objid);
      TicketModel.aggregate([
        {
          $lookup: {
            from: 'seans',
            localField: 'seans',
            foreignField: '_id',
            as: 'seans',
          },
        },
        { $unwind: '$seans' },
        {
          $lookup: {
            from: 'films',
            localField: 'seans.film',
            foreignField: '_id',
            as: 'seans.film',
          },
        },
        { $unwind: '$seans.film' },
        {
          $match: {
            'seans.film._id': { $eq: objid },
          },
        },
        {
          $group: {
            _id: '$seans.date.date',
            count: { $count: {} },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]).exec((err: any, seans: any) => {
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
}
