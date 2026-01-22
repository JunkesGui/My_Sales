import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { inject, injectable } from 'tsyringe';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { IProductRepositories } from '../domain/repositories/IProductRepositories';
import { SearchParams } from '@shared/interfaces/SearchParams';
@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepositories')
    private productsRepository: IProductRepositories,
  ) {}
  public async execute(
    page: number,
    limit: number
  ): Promise<IProductPaginate> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProductPaginate>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll({ page, take: limit, skip: (page -1) * limit });

      await redisCache.save(
        'api-vendas-PRODUCT_LIST',
        JSON.stringify(products),
      );
    }

    const total = products.total

    const totalPages = Math.ceil(total/limit)

    return{
      per_page: limit,
      total,
      data: products.data,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page +1: null,
      previous_page: page > 1 ? page -1: null,

    }
  }
}

