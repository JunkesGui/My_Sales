import { Router } from 'express'
import OrdersController from '../controller/OrdersControllers'
import AuthMiddleware from '@shared/middlewares/authMiddleware'
import { createOrderValidate, idParamsValidate } from '../schemas/OrdersSchemas'

const orderRouter = Router()
const ordersController = new OrdersController

orderRouter.use(AuthMiddleware.execute)

orderRouter.get('/:id', idParamsValidate, ordersController.show)
orderRouter.post('/', createOrderValidate, ordersController.create)

export default orderRouter
