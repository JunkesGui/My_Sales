import { Order } from "@modules/orders/infra/database/entities/Order";
import { Product } from "@modules/products/infra/database/entities/Product";

export interface IOrderProduct{
  id: number,
  order: Order,
  order_id: number,
  product: Product,
  product_id: number,
  price: number,
  quantity: number,
  created_at: Date,
  updated_at: Date
}
