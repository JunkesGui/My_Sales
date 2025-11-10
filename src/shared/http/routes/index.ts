import productsRouter from '@modules/products/routes/ProductRoutes';
import sessionRouter from '@modules/users/routes/SessionRoutes';
import userRouter from '@modules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) =>{
  return response.json({message: 'Hello, Im healthy'});
});
routes.use('/products', productsRouter);
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)

export default routes;
