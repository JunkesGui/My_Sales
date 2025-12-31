import { Repository } from 'typeorm';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { Order } from '../entities/Order';
import { IOrderRepositories, Pagination } from '@modules/orders/domain/repositories/IOrderRepositories';
import { SearchParams } from '@shared/interfaces/SearchParams';



export default class OrderRepositories implements IOrderRepositories {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  async findById(id: number): Promise<IOrder | null> {
    const order = this.ormRepository.findOne({
      where: { id: Number(id) },
      relations: ['order_products', 'customer'],
    });

    return order as unknown as IOrder;
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result as unknown as IOrderPaginate;
  }

  async create({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order as unknown as IOrder;
  }

  async save(order: IOrder): Promise<IOrder>{
    await this.ormRepository.save(order);

    return order;
  }

  async findAndCount({ take, skip }: Pagination): Promise<[IOrder[], number]> {
    const [orders, total] = await this.ormRepository.findAndCount({
      take, skip
    });

    return [orders, total]
  }
}

