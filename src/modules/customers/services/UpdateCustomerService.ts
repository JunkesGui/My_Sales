import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { ICustomerRepositories } from "../domain/repositories/ICustomerRepositories";
import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";

@injectable()
export default class UpdateCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories){}
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer>{
    const redisCache = new RedisCache()
    const customer = await this.customerRepositories.findById(id)

    if(!customer){
      throw new AppError('Customer not found', 404)
    }

    const customerExists = await this.customerRepositories.findByEmail(email)

    if(customerExists && email !== customer.email){
      throw new AppError('Email address already taken', 409)
    }

    customer.name = name
    customer.email = email

    await this.customerRepositories.save(customer)

    await redisCache.invalidate('api-mysales-CUSTOMER_LIST')

    return customer
  }
}
