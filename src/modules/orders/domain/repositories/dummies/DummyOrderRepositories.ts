import { Order } from "@modules/orders/infra/database/entities/Order";
import AppError from "@shared/errors/AppError";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateOrder } from "../../models/ICreateOrder";
import { IOrderPaginate } from "../../models/IOrderPaginate";
import { IOrderProduct } from "../../models/IOrderProduct";
import { IOrderRepositories } from "../IOrderRepositories";

export default class DummyOrderRepositories implements IOrderRepositories{
  private orders: Order[] = [];

  async create({customer, products}: ICreateOrder): Promise<Order>{
  const order = new Order();

  order.id = this.orders.length + 1;
  order.customer = customer;
  order.order_products = products as IOrderProduct[]

  this.orders.push(order);

  return order;
  }

  async save(order: Order): Promise<Order>{
    const findIndex = this.orders.findIndex(findOrder => findOrder.id === order.id)

    this.orders[findIndex] = order;

    return order;
  }

  async findAll({page, take}: SearchParams): Promise<IOrderPaginate> {
    const orders = this.orders
    const count = this.orders.length

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result as IOrderPaginate
  }

  async findById(id: number): Promise<Order | null> {
    const order = this.orders.find(order => order.id === id)

    return order as Order | null
  }

  findAndCount(): Promise<[Order[], number]> {
    throw new AppError('Funcao nao implementada', 400)
  }
}
