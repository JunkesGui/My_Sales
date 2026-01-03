import { Pagination } from "@shared/interfaces/Pagination";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateCustomer } from "../../models/ICreateCustomer";
import { ICustomer } from "../../models/ICustomer";
import { ICustomerPaginate } from "../../models/ICustomerPaginate";
import { ICustomerRepositories } from "../ICustomerRepositories";
import { Customer } from "@modules/customers/infra/database/entities/Customer";
import AppError from "@shared/errors/AppError";

export default class DummyCustomerRepositories implements ICustomerRepositories{
  private customers: Customer[] = [];

  async create({name, email}: ICreateCustomer): Promise<Customer>{
  const customer = new Customer();

  customer.id = this.customers.length + 1;
  customer.name = name;
  customer.email = email;

  this.customers.push(customer);

  return customer;
  }

  async save(customer: Customer): Promise<Customer>{
    const findIndex = this.customers.findIndex(findCustomer => findCustomer.id === customer.id)

    this.customers[findIndex] = customer;

    return customer;
  }

  async remove(customer: Customer): Promise<void>{
    const index = this.customers.findIndex(findCustomer => findCustomer.id === customer.id)
    if (index !== -1){
      this.customers.splice(index, -1)
    }
  }

  async findAll({page, skip, take}: SearchParams): Promise<ICustomerPaginate> {
    const customers = this.customers
    const count = this.customers.length

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result as ICustomerPaginate
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.name === name)
    return customer as Customer | null
  }

  async findById(id: number): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.id === id)

    return customer as Customer | null
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.email === email)

    return customer as Customer | null
  }

  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new AppError('Funcao nao implementada', 400)
  }
}
