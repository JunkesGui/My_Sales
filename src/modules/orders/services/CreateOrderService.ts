import { customerRepositories } from "@modules/customers/database/repositories/CustomerRepositories";
import { Order } from "../database/entities/Order";
import AppError from "@shared/errors/AppError";
import { Product } from "@modules/products/database/entities/Product";
import { ProductsRepositories } from "@modules/products/database/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface ICreateOrder{
  customer_id: number,
  products: Product[]
}

export default class CreateOrderService{
  async execute({customer_id, products}: ICreateOrder): Promise<Order>{
    const customerExists = await customerRepositories.findById(customer_id)

    if(!customerExists){
      throw new AppError('Customer not found', 404)
    }

    const existentProducts = await ProductsRepositories.findAllById(products)

    if (!existentProducts?.length){
      throw new AppError('No product was found', 404)
    }

    const productIds = products.map(product => product.id)

    const checkInexistentProducts = products.filter(product => !productIds.includes(product.id))

    if (!checkInexistentProducts.length){
      throw new AppError(`Product not found`, 404)
    }

    const quantityAvailable = products.filter(product => {
      existentProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    })

    if (!quantityAvailable.length){
      throw new AppError (`The quantity is not available for a product`, 409)
    }

    const serializedProducts = products.map(p => ({
      product_id: p.id,
      quantity: p.quantity,
      price: existentProducts.filter(prod => prod.id === prod.id)[0].price
    }))

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts
  })

  const {order_products} = order

  const updateProductQuantity = order_products.map(p => ({
    id: p.product_id,
    quantity: existentProducts.filter(prod => prod.id === p.product_id)[0].quantity - p.quantity
  }))

  await ProductsRepositories.save(updateProductQuantity)

  return order
  }
}
