import express from 'express';
import Api from './controllers/api';
import { DB } from './models/db/connect';

require('dotenv').config({ path: process.cwd() + `/env/.env` });
const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const api = new Api(app);

new DB().init();

api.init();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
