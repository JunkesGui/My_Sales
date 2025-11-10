import { Router } from 'express';
import UserControllers from '../controllers/UsersControllers';
import { createUserSchema } from '../schemas/UserSchemas';

const userRouter = Router();
const userControllers = new UserControllers();

userRouter.get('/', userControllers.index);
userRouter.post('/', createUserSchema, userControllers.create);

export default userRouter;
