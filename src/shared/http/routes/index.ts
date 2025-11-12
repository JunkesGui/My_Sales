import productsRouter from '@modules/products/routes/ProductRoutes';
import avatarRouter from '@modules/users/routes/AvatarRoutes';
import sessionRouter from '@modules/users/routes/SessionRoutes';
import userRouter from '@modules/users/routes/UserRoutes';
import express, { Router } from 'express';
import uploadConfig from '@config/upload'

const routes = Router();

routes.get('/health', (request, response) =>{
  return response.json({message: 'Hello, Im healthy'});
});
routes.use('/products', productsRouter);
routes.use('/users', userRouter)
routes.use('/sessions', sessionRouter)
routes.use('/avatar', avatarRouter)
routes.use('/files', express.static(uploadConfig.directory))

export default routes;
