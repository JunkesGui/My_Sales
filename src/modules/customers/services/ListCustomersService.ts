import { IPagination } from "@shared/interfaces/pagination.interface";
import { Customer } from "../infra/database/entities/Customer";
import { inject, injectable } from "tsyringe";
import { ICustomerRepositories } from "../domain/repositories/ICustomerRepositories";
import { ICustomerPaginate } from "../domain/models/ICustomerPaginate";

@injectable()
export default class ListCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories) {}
  async execute(page: number = 1, limit: number = 10): Promise<ICustomerPaginate> {


    const [data, total] = await this.customerRepositories.findAndCount({
      take: limit,
      skip: (page -1) * limit
    })

    const totalPages = Math.ceil(total / limit)

    return {
      per_page: limit,
      total,
      data,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page +1: null,
      previous_page: page > 1 ? page -1: null,
    }
  }
}
