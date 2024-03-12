import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/api.js';

const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use('/api', apiRouter);

export { app, APP_PORT };
