import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomerId } from "../domain/models/ICustomerId";
import { ICustomerRepositories } from "../domain/repositories/ICustomerRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ShowCustomerService{
  constructor(@inject('CustomerRepositories') private readonly customerRepositories: ICustomerRepositories){}

  async execute({ id }: ICustomerId): Promise<Customer>{
    const customer = await this.customerRepositories.findById(id)

    if (!customer){
      throw new AppError('Customer not found', 404)
    }
    return customer
  }
}
