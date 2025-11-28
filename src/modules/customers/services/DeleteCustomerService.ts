import AppError from "@shared/errors/AppError"
import { customerRepositories } from "../infra/database/repositories/CustomerRepositories"
import { ICustomerId } from "../domain/models/ICustomerId"

export default class DeleteCustomerService{
  async execute({ id }: ICustomerId): Promise<void>{
    const customer = await customerRepositories.findById(id)

    if(!customer){
      throw new AppError('Customer not found', 404)
    }

    await customerRepositories.remove(customer)
  }
}
