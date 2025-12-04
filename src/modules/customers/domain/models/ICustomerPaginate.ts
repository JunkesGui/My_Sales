import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { ICustomer } from "./ICustomer";

export interface ICustomerPaginate{
  per_page: number,
  total: number,
  current_page: number,
  total_pages: number,
  next_page: number | null,
  previous_page: number | null,
  data: ICustomer[]
}
