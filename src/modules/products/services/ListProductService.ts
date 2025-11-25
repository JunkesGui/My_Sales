import RedisCache from "@shared/cache/RedisCache";
import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

export default class ListProductService {
  async execute (): Promise<Product[]> {
    const redisCache = new RedisCache()
    let products = await redisCache.recover<Product[]>('api-mysales-PRODUCT-LIST')

    if(!products){
      products = await ProductsRepositories.find()
      await redisCache.save('api-mysales-PRODUCT-LIST', JSON.stringify(products))
    }

    return products;
  }
}
