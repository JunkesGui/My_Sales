import { Router } from 'express';
import UserControllers from '../controllers/UsersControllers';
import { createUserSchema } from '../schemas/UserSchemas';
import AuthMiddleware from '@shared/middlewares/authMiddleware';

const userRouter = Router();
const userControllers = new UserControllers();

userRouter.get('/', AuthMiddleware.execute , userControllers.index);
userRouter.post('/', createUserSchema, userControllers.create);

export default userRouter;
