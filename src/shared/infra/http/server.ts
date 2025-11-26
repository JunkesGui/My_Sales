import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { AppDataSource } from '@shared/typeorm/data-source';
import rateLimiter from '@shared/middlewares/rateLimiter';

AppDataSource.initialize().then(async() =>{
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(rateLimiter.execute)
  app.use(routes);
  app.use(errors());
  app.use(ErrorHandlerMiddleware.handleError)

  console.log('Connected to database')

  app.listen(3333, () =>{
    console.log('Listening at port 3333')
  });


  })
  .catch(error =>{
    console.error('Failed to connect to database: ', error)
  })

