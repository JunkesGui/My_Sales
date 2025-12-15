import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Customer } from "../entities/Customer";
import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import { Repository } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { ICustomerPaginate } from "@modules/customers/domain/models/ICustomerPaginate";
import { Pagination } from "@shared/interfaces/Pagination";

export default class CustomerRepositories implements ICustomerRepositories {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  async findById(id: number): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }

  async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);

    return;
  }

  async findAndCount({ take, skip }: Pagination): Promise<[ICustomer[], number]> {
    const [customers, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });

    return [customers, total];
  }

  async findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate> {
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

    return result as unknown as ICustomerPaginate;
  }
}
