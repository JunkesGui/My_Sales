import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../infra/database/repositories/ProductsRepositories";
import { Product } from "../infra/database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { ICreateProduct } from "../domain/models/ICreateProduct";

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
