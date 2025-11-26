import productsRouter from '@modules/products/infra/http/routes/ProductRoutes';
import express, { Router } from 'express';
import uploadConfig from '@config/upload'
import customerRouter from '@modules/customers/infra/http/routes/CustomerRoutes';
import orderRouter from '@modules/orders/infra/http/routes/OrdersRoutes';
import avatarRouter from '@modules/users/infra/http/routes/AvatarRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import sessionRouter from '@modules/users/infra/http/routes/SessionRoutes';
import userRouter from '@modules/users/infra/http/routes/UserRoutes';

const routes = Router();

routes.get('/health', (request, response) =>{
  return response.json({message: 'Hello, Im healthy'});
});
routes.use('/products', productsRouter);
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)
routes.use('/avatar', avatarRouter)
routes.use('/files', express.static(uploadConfig.directory))
routes.use('/passwords', passwordRouter)
routes.use('/profiles', profileRouter)
routes.use('/customers', customerRouter)
routes.use('/orders', orderRouter)

export default routes;
