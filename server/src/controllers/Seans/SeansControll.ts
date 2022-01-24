import { Request, Response, IRoute } from 'express';
import { find } from 'tslint/lib/utils';
import { SeansModel, SeansSchema } from '../../models/db/mongodb/schema/seans';
import { PageControll } from '../PageController';
import mongoose from 'mongoose';
import SeansId from './seansIdControll';
import SeansPopular from './SeansPopular';

export default class Seans extends PageControll {
  path = '/seans';
  route: IRoute = this.router.route(this.path);

  init() {
    this.get();
    this.post();
    this.router.use(this.path, new SeansId().init());
    this.router.use(this.path, new SeansPopular().init());
    return this.router;
  }

  /**
   * @url /api/seans
   *
   * @returns Array<Seans>
   */

  get() {
    this.route.get(
      (
        req: Request<
          any,
          any,
          any,
          {
            startDate: String;
            endDate: String;
            sort: String;
            now: String;
            startTime: String;
            endTime: String;
            ticketPrice: Number;
            id: String;
            hall: String;
          }
        >,
        res: Response
      ) => {
        const {
          startDate,
          endDate,
          startTime,
          endTime,
          ticketPrice,
          id,
          hall,
        }: {
          hall: String;
          startDate: String;
          endDate: String;
          startTime: String;
          endTime: String;
          ticketPrice: Number;
          id: String;
        } = req.query;
        if (!startDate || !endDate || !endTime || !endTime) {
          const { sort, now } = req.query;
          console.log('Seans List Get. Now =', now);
          let $match = {};
          if (now === 'true') {
            const date = new Date();
            const fullYear = date.getFullYear();
            const minutes = date.getMinutes();
            const hour = date.getHours();
            const month = date.getMonth() + 1;
            const days = date.getDate();

            $match = {
              $or: [
                {
                  $and: [
                    {
                      'date.date': {
                        $eq: `${fullYear}-${month < 10 ? `0${month}` : month}-${
                          days < 10 ? `0${days}` : days
                        }`,
                      },
                    },
                    {
                      'date.time': {
                        $gte: `${hour < 10 ? `0${hour}` : hour}:${
                          minutes < 10 ? `0${minutes}` : minutes
                        }`,
                      },
                    },
                  ],
                },
                {
                  'date.date': {
                    $gt: `${fullYear}-${month < 10 ? `0${month}` : month}-${
                      days < 10 ? `0${days}` : days
                    }`,
                  },
                },
              ],
            };
          } else $match = {};
          console.log(JSON.stringify($match));
          SeansModel.aggregate([
            { $match: { isDelete: false } },
            { $match },
            {
              $lookup: {
                from: 'films',
                localField: 'film',
                foreignField: '_id',
                as: 'film',
              },
            },
            {
              $match: {
                'film.isDelete':{$eq:false}
              },
            },
            {
              $lookup: {
                from: 'halls',
                localField: 'hall',
                foreignField: '_id',
                as: 'hall',
              },
            },
            {
              $group: {
                _id: `$${sort || 'date.date'}`,
                seans: { $push: '$$ROOT' },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
            {
              $unwind: {
                path: '$seans',
              },
            },
            {
              $sort: {
                'seans.date.time': 1,
              },
            },
            {
              $group: {
                _id: '$_id',
                seans: {
                  $push: '$seans',
                },
              },
            },
          ])
            .sort('_id')
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
        } else {
          let find = {},
            match = {};

          if (id) {
            let objid = new mongoose.Types.ObjectId((id as string) || '');
            find = {
              _id: { $ne: objid },
            };
            match = { _id: { $ne: objid } };
          }
          SeansModel.find({
            ...find,
          })
            .populate({
              path: 'hall',
              match,
            })
            .find({
              $and: [
                {
                  $or: [
                    {
                      $and: [
                        { 'date.date': { $eq: startDate } },
                        { 'date.time': { $gte: startTime } },
                        { 'date.date': { $eq: endDate } },
                        { 'date.time': { $lte: endTime } },
                      ],
                    },
                    {
                      $and: [
                        { 'endDate.date': { $eq: startDate } },
                        { 'endDate.time': { $gte: startTime } },
                        { 'endDate.date': { $eq: endDate } },
                        { 'endDate.time': { $lte: endTime } },
                      ],
                    },
                  ],
                },
              ],
            })
            .exec((err, result) => {
              if (err) {
                console.log(err);
                res.statusCode = 400;
                res.send({ error: 'Server error', data: Date.now });
              } else {
                console.log(
                  'seans Get by date',
                  id,
                  JSON.stringify(result) || 404
                );
                res.send(result || 404);
              }
            });
        }
      }
    );
  }

  /**
   * @url /api/seans
   * 
   * @example {
    "film":"6186c3e169b9d028bb3c8cb1", // <- id
    "hall":"618900741cfb91cc68c27bac", // <- id
    "date":{
        "date":"2021-01-10",
        "time":"12:20"
    }
  }
   */

  post() {
    this.route.post(async (req: Request, res: Response) => {
      const body: Seans = req.body;
      console.log('Seans List POST');
      console.log(body);
      if (body) {
        const doc = new SeansModel(body);
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
