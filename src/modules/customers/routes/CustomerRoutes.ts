import { Router } from 'express'
import CustomerControllers from '../controller/CustomerControllers'
import AuthMiddleware from '@shared/middlewares/authMiddleware'
import { createCustomerSchema, idParamsValidate, updateCustomerSchema } from '../schemas/CustomerSchema'

const customerRouter = Router()
const customerControllers = new CustomerControllers()

customerRouter.use(AuthMiddleware.execute)
customerRouter.get('/', customerControllers.index)
customerRouter.get('/:id', idParamsValidate, customerControllers.show)
customerRouter.post('/', createCustomerSchema, customerControllers.create)
customerRouter.patch('/:id', idParamsValidate, updateCustomerSchema, customerControllers.update)
customerRouter.delete('/:id', idParamsValidate, customerControllers.delete)

export default customerRouter
