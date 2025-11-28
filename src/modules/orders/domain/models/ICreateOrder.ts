import { Product } from "@modules/products/infra/database/entities/Product";

export interface ICreateOrder{
  customer_id: number,
  products: Product[]
}
