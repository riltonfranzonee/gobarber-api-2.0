import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';

import routes from './routes';

import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(errors());

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server listening on port 3333');
});
