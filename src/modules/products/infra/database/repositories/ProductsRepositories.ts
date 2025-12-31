import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Product } from "../entities/Product";
import { In, Repository } from 'typeorm'
import { IFindProducts, IProductRepositories } from "@modules/products/domain/repositories/IProductRepositories";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { Pagination } from "@shared/interfaces/Pagination";
import { IProductPaginate } from "@modules/products/domain/models/IProductPaginate";
import { SearchParams } from "@shared/interfaces/SearchParams";

export default class ProductsRepositories implements IProductRepositories{
  private ormRepository: Repository<Product>;

  constructor(){
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  async findByName(name: string): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({
      name,
    });

    return product;
  }

  async findById(id: number): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({
      id,
    });

    return product;
  }

  async create({ name, price, quantity }: ICreateProduct): Promise<IProduct>{
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  async updateQuantity(products: IFindProducts[]): Promise<void>{
    await this.ormRepository.save(products)

    return;
  }

  async remove(product: IProduct): Promise<void>{
    await this.ormRepository.remove(product);

    return;
  }

  async findAndCount({ take, skip }: Pagination): Promise<[IProduct[], number]> {
    const [products, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });

    return [products, total];
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
    .createQueryBuilder()
    .skip(skip)
    .take(take)
    .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result as unknown as IProductPaginate;
  }

    async findAllById(products: IFindProducts[]): Promise<IProduct[] | null>{
      const productIds = products.map(product => product.id)
      const existentProducts = await this.ormRepository.find({where: { id: In(productIds) }})

      return existentProducts
    }
}
