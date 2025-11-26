import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../infra/database/repositories/ProductsRepositories";
import RedisCache from "@shared/cache/RedisCache";

interface IDeleteProduct{
  id: number;
}

export default class DeleteProductService{
  async execute({id}: IDeleteProduct): Promise<void>{
    const redisCache = new RedisCache

    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    await ProductsRepositories.remove(product)
  }
}
