import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../infra/database/repositories/ProductsRepositories";
import { Product } from "../infra/database/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IUpdateProduct{
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService{
  async execute({id, name, price, quantity}: IUpdateProduct): Promise<Product>{
    const redisCache = new RedisCache

    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    const productExists = await ProductsRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already a product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepositories.save(product)

    await redisCache.invalidate('api-mysales-PRODUCT-LIST')

    return product
  }
}
