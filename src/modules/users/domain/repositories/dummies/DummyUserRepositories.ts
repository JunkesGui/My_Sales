import { User } from "@modules/users/infra/database/entities/User";
import AppError from "@shared/errors/AppError";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICreateUser } from "../../models/ICreateUser";
import { IUser } from "../../models/IUser";
import { IUserPaginate } from "../../models/IUserPaginate";
import { IUserRepositories } from "../IUserRepositories";

export default class DummyUserRepositories implements IUserRepositories{
  private users: User[] = [];

  async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = this.users.length + 1;
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  async save(user: User): Promise<IUser> {
    const findIndex = this.users.findIndex(finduser => finduser.id === user.id)

    this.users[findIndex] = user;

    return user;
  }

  async findAll({page, take}: SearchParams): Promise<IUserPaginate> {
    const users = this.users
    const count = this.users.length

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result as unknown as IUserPaginate
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find(user => user.name === name)
    return user as User | null
  }

  async findById(id: number): Promise<IUser | null> {
    const user = this.users.find(user => user.id === id)

    return user as User | null
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(user => user.email === email)

    return user as User | null
  }

  findAndCount(): Promise<[IUser[], number]> {
    throw new AppError('Funcao nao implementada', 400)
  }

}
