import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import db from './models/index';
import logger from './config/winston';
import apiRouter from './routes/api/index.routes';
import homeRouter from './routes/home/home.routes';
import errorHandler from './middlewares/error.middleware';
import formatRes from './middlewares/response.middleware';
import session from './middlewares/session.middleware';

dotenv.config();

const app = express();

db.connectDB();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formatRes);
app.use(session);

app.use('/', homeRouter);
app.use('/v1/api', apiRouter);

app.use(errorHandler);

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

app.listen(PORT, HOST, () => {
  logger.info(`Server is running http://${HOST}:${PORT}`);
});
