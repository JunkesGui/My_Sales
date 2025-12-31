import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { Customer } from "@modules/customers/infra/database/entities/Customer";

interface IProduct {
  id: number;
  quantity: number;
}

export interface ICreateOrder{
  customer: Customer,
  products: IProduct[]
}
