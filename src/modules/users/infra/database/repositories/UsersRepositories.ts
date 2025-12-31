import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { User } from "../entities/User";
import { IUserRepositories } from "@modules/users/domain/repositories/IUserRepositories";
import { Repository } from "typeorm";
import { IUser } from "@modules/users/domain/models/IUser";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { Pagination } from "@shared/interfaces/Pagination";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { IUserPaginate } from "@modules/users/domain/models/IUserPaginate";

export default class UserRepositories implements IUserRepositories {
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findByName(name: string): Promise<IUser | null>{
    return this.ormRepository.findOneBy({ name });
  }

  async findByEmail(email: string): Promise<IUser | null>{
    return this.ormRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<IUser | null>{
    return this.ormRepository.findOneBy({ id });
  }

  async create({ name, email, password }: ICreateUser): Promise<IUser>{
    const user = this.ormRepository.create({ name, email, password })

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: IUser): Promise<IUser>{
    await this.ormRepository.save(user);

    return user;
  }

  async findAndCount({ take, skip }: Pagination): Promise<[IUser[], number]> {
    const [customers, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });

    return [customers, total];
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IUserPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result as unknown as IUserPaginate;
  }
}






