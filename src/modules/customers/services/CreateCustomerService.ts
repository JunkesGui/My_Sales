import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import { inject, injectable } from "tsyringe";
import RedisCache from "@shared/cache/RedisCache";

@injectable()
export default class CreateCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories){}

  async execute({ name, email }: ICreateCustomer): Promise<Customer>{
    const redisCache = new RedisCache()

    const emailExists = await this.customerRepositories.findByEmail(email)

    if (emailExists){
      throw new AppError('Email already been taken', 409)
    }

    const customer = this.customerRepositories.create({ name, email })
    await redisCache.invalidate('api-mysales-CUSTOMER_LIST')

    return customer
  }
}
