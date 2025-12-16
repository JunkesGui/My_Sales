import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { inject, injectable } from "tsyringe";
import { IProductRepositories } from "../domain/repositories/IProductRepositories";

@injectable()
export default class CreateProductService{
  constructor(@inject('ProductRepositories') private readonly productRepositories: IProductRepositories){}

  async execute({name, price, quantity}: ICreateProduct): Promise<Product>{
    const redisCache = new RedisCache

    const productExists = await this.productRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already a product with this name', 409);
    }

    const product = this.productRepositories.create({
      name, price, quantity
    });

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    return product
  }
}
