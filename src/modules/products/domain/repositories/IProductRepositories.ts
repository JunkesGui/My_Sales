import { Pagination } from "@shared/interfaces/Pagination";
import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { IProductPaginate } from "../models/IProductPaginate";

export interface IProductRepositories{
  findByName(name: string): Promise<IProduct | null>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  findById(id: number): Promise <IProduct | null>;
  findAndCount(pagination: Pagination): Promise<[IProduct[], number]>;
  findAll(SearchParams: SearchParams): Promise<IProductPaginate>
}
