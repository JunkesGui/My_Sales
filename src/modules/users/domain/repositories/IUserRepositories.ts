import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";
import { Pagination } from "@shared/interfaces/Pagination";

export interface IUserRepositories {
  findByName(name: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: number): Promise<IUser | null>;
  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  findAndCount(pagination: Pagination): Promise<[IUser[], number]>;
  findAll(serachParams: SearchParams): Promise<IUserPaginate>;
}
