import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { IProductId } from "../domain/models/IProductId";
import { IProductRepositories } from "../domain/repositories/IProductRepositories";
import { injectable, inject } from "tsyringe";

@injectable()
export default class DeleteProductService{
  constructor(@inject('ProductRepositories') private readonly productRepositories: IProductRepositories){}

  async execute({id}: IProductId): Promise<void>{
    const redisCache = new RedisCache

    const product = await this.productRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    await this.productRepositories.remove(product)
  }
}
