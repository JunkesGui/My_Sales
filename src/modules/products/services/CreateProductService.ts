import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface ICreateProduct{
  name: string,
  price: number,
  quantity: number
}

export default class CreateProductService{
  async execute({name, price, quantity}: ICreateProduct): Promise<Product>{
    const redisCache = new RedisCache

    const productExists = await ProductsRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already a product with this name', 409);
    }

    const product = ProductsRepositories.create({
      name, price, quantity
    });

    await ProductsRepositories.save(product)

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    return product
  }
}
