import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import "express-async-errors";
require('reflect-metadata');
import ErrorHandlerMiddleware from '../middlewares/ErrorHandlerMiddleware';
import { AppDataSource } from '../typeorm/data-source';
import { errors } from 'celebrate';

AppDataSource.initialize().then(async() =>{
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errors());
  app.use(ErrorHandlerMiddleware.handleError)

  console.log('Connected to database')

  app.listen(3333, () =>{
    console.log('Listening at port 3333')
  });


  }).catch(error =>{
    console.error('Failed to connect to database: ', error)
  })

