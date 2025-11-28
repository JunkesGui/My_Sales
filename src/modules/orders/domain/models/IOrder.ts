import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { OrdersProducts } from "@modules/orders/infra/database/entities/OrderProducts";

export interface IOrder{
  id: number,
  customer: Customer,
  order_products: OrdersProducts[],
  created_at: Date,
  updated_at: Date
}
