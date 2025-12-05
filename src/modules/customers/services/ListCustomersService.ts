import { IPagination } from "@shared/interfaces/pagination.interface";
import { Customer } from "../infra/database/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepositories } from "../domain/repositories/ICustomerRepositories";
import { ICustomerPaginate } from "../domain/models/ICustomerPaginate";
import RedisCache from "@shared/cache/RedisCache";
import { ICustomer } from "../domain/models/ICustomer";

@injectable()
export default class ListCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories) {}
  async execute(page: number, limit: number): Promise<ICustomerPaginate> {
    const redisCache = new RedisCache()

    let find = await redisCache.recover<ICustomerPaginate>('api-mysales-CUSTOMER_LIST')

    if(!find || find.current_page != page){
      find = await this.customerRepositories.findAll({ page, take: limit, skip: (page -1) * limit})
      await redisCache.save('api-mysales-CUSTOMER_LIST', JSON.stringify(find))
    }

    const total = find.total

    const totalPages = Math.ceil(total / limit)

    return {
      per_page: limit,
      total,
      data: find.data,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page +1: null,
      previous_page: page > 1 ? page -1: null,
    }
  }
}
