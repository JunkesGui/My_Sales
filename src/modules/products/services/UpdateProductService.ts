import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { IProductRepositories } from "../domain/repositories/IProductRepositories";
import { injectable, inject } from "tsyringe";

@injectable()
export default class UpdateProductService{
  constructor(@inject('ProductRepositories') private readonly productRepositories: IProductRepositories){}

  async execute({id, name, price, quantity}: IUpdateProduct): Promise<Product>{

    const redisCache = new RedisCache

    const product = await this.productRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    const productExists = await this.productRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already a product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepositories.save(product)

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    return product
  }
}
