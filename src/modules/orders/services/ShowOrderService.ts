import AppError from "@shared/errors/AppError";
import { Order } from "../infra/database/entities/Order";
import { inject, injectable } from "tsyringe";
import { IOrderRepositories } from "../domain/repositories/IOrderRepositories";

@injectable()
export default class ShowOrderService{
  constructor(@inject('OrderRepositories') private readonly orderRepositories: IOrderRepositories){}
  async execute(id: number): Promise<Order>{
    const order = await this.orderRepositories.findById(Number(id))

    if(!order){
      throw new AppError('Order not found', 404)
    }

    return order
  }
}
