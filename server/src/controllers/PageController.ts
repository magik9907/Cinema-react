import express, { IRoute, Router } from 'express';

export abstract class PageControll {
  protected router: Router = express.Router({ mergeParams: true });
  abstract route: IRoute;
  abstract path: string;
  abstract init(): Router;
}
