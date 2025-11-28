import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { customerRepositories } from "../infra/database/repositories/CustomerRepositories";
import { ICustomerId } from "../domain/models/ICustomerId";

export default class ShowCustomerService{
  async execute({ id }: ICustomerId): Promise<Customer>{
    const customer = await customerRepositories.findById(id)

    if (!customer){
      throw new AppError('Customer not found', 404)
    }
    return customer
  }
}
