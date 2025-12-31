import { Order } from "../infra/database/entities/Order";
import AppError from "@shared/errors/AppError";
import { ICreateOrder } from "../domain/models/ICreateOrder";
import { inject, injectable } from "tsyringe";
import { IOrderRepositories } from "../domain/repositories/IOrderRepositories";;
import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import { IProductRepositories } from "@modules/products/domain/repositories/IProductRepositories";

interface IProduct {
  id: number;
  quantity: number;
}

interface IRequest{
  customer_id: number,
  products: IProduct[]
}

@injectable()
export default class CreateOrderService{
  constructor(
    @inject('OrderRepositories') private readonly orderRepositories: IOrderRepositories,
    @inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories,
    @inject('ProductRepositories') private readonly productRepositories: IProductRepositories
){}

  async execute({customer_id, products}: IRequest): Promise<Order>{
    const customerExists = await this.customerRepositories.findById(customer_id)

    if(!customerExists){
      throw new AppError('Customer not found', 404)
    }

    const existentProducts = await this.productRepositories.findAllById(products)

    if (!existentProducts?.length){
      throw new AppError('No product was found', 404)
    }

    const productIds = existentProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(product => !productIds.includes(product.id))

    if (checkInexistentProducts.length){
      throw new AppError(`Product not found`, 404)
    }

    const quantityAvailable = products.filter(product =>
      existentProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    )

    if (quantityAvailable.length){
      throw new AppError (`The quantity is not available for a product`, 409)
    }

    const serializedProducts = products.map(p => ({
      id: p.id,
      quantity: p.quantity,
      price: existentProducts.filter(prod => prod.id === prod.id)[0].price
    }))

    const order = await this.orderRepositories.create({
      customer: customerExists,
      products: serializedProducts
  })

  const {order_products} = order

  const updateProductQuantity = order_products.map(p => ({
    id: p.id,
    quantity: existentProducts.filter(prod => prod.id === p.id)[0].quantity - p.quantity
  }))

  await this.productRepositories.updateQuantity(updateProductQuantity)

  return order
  }
}
