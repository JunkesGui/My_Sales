import ShowCustomerService from '@modules/customers/services/ShowCustomerService'
import CreateOrderService from '@modules/orders/services/CreateOrderService'
import { Request, Response } from 'express'

export default class OrdersController {
  async show(request: Request, response: Response): Promise<Response>{
    const id = Number(request.params.id)

    const showOrder = new ShowCustomerService()
    const order = await showOrder.execute({id})

    return response.json(order)
  }

  async create(request: Request, response: Response): Promise<Response>{
    const { customer_id, products } = request.body
    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({
      customer_id,
      products
    })

    return response.json(order)
  }
}
