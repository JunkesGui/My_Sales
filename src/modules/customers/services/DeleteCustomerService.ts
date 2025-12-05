import AppError from "@shared/errors/AppError"
import { ICustomerId } from "../domain/models/ICustomerId"
import RedisCache from "@shared/cache/RedisCache"
import { ICustomerRepositories } from "../domain/repositories/ICustomerRepositories"
import { inject, injectable } from "tsyringe"

@injectable()
export default class DeleteCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories){}

  async execute({ id }: ICustomerId): Promise<void>{
    const redisCache = new RedisCache()

    const customer = await this.customerRepositories.findById(id)

    if(!customer){
      throw new AppError('Customer not found', 404)
    }

    await this.customerRepositories.remove(customer)

    await redisCache.invalidate('api-mysales-CUSTOMER_LIST')
  }
}
