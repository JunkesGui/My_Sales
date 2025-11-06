import productsRouter from '@modules/products/routes/ProductRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) =>{
  return response.json({message: 'Hello, Im healthy'});
});
routes.use('/products', productsRouter);

export default routes;
