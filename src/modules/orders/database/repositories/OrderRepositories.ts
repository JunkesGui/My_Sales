import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Order } from "../entities/Order";
import { Customer } from "@modules/customers/infra/database/entities/Customer";

interface ICreateOrder{
  customer: Customer,
  products: ICreateOrderProducts[]
}

interface ICreateOrderProducts{
  product_id: number,
  price: number,
  quantity: number
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id }, relations: ['order_products', 'customer']
    })
    return order
  },

  async createOrder({customer, products}: ICreateOrder): Promise<Order>{
    const order = this.create({
      customer,
      order_products: products
    })

    await this.save(order)

    return order
  }
})
