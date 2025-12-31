import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateOrder } from "../models/ICreateOrder"
import { IOrder } from "../models/IOrder"
import { IOrderPaginate } from "../models/IOrderPaginate";

export interface Pagination{
  take: number,
  skip: number
}

export interface IOrderRepositories{
  create(data: ICreateOrder): Promise<IOrder>;
  save(order: IOrder): Promise<IOrder>;
  findById(id: number): Promise<IOrder | null>;
  findAndCount(pagination: Pagination): Promise<[IOrder[], number]>;
  findAll(serachParams: SearchParams): Promise<IOrderPaginate>;
}
