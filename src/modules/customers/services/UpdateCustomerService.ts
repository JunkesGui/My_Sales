import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { customerRepositories } from "../infra/database/repositories/CustomerRepositories";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";

export default class UpdateCustomerService{
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer>{
    const customer = await customerRepositories.findById(id)

    if(!customer){
      throw new AppError('Customer not found', 404)
    }

    const customerExists = await customerRepositories.findByEmail(email)

    if(customerExists && email !== customer.email){
      throw new AppError('Email address already taken', 409)
    }

    customer.name = name
    customer.email = email

    await customerRepositories.save(customer)

    return customer
  }
}
