import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';

import config from './config';
import router from './routes';
import database from './config/database';

const milliSecondsInADay = 8640000;

dotenv.config();
const app = express();
const port = config.server.PORT;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: milliSecondsInADay,
    keys: [config.session.SECRET],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
require('./config/passport');

app.use('/', router);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

database.connectDB(() => server.close());

module.exports = server;
