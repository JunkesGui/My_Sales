import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import ErrorHandlerMiddleware from '@shared/middlewares/ErrorHandlerMiddleware';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import rateLimiter from '@shared/middlewares/RateLimiter';
import '@shared/containers'

const startServer = async () =>{
  await AppDataSource.initialize()

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(rateLimiter.execute)
  app.use(routes);
  app.use(errors());
  app.use(ErrorHandlerMiddleware.handleError)
  console.log('Connected to database')

  return app;
}

export default startServer()
  .then(app =>{
    return app.listen(3333, () =>{
      console.log('Listening at port 3333')
    })
  })

  .catch(error =>{
    console.error('Failed to connect to server: ', error)
  })

