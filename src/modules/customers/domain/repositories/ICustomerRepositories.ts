import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { ICustomerPaginate } from "../models/ICustomerPaginate";
import { Customer } from "@modules/customers/infra/database/entities/Customer";

export interface Pagination{
  take: number,
  skip: number
}

export interface ICustomerRepositories {
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
  findById(id: number): Promise<ICustomer | null>;
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]>;
  findByName(name: string): Promise<ICustomer | null>;
}
