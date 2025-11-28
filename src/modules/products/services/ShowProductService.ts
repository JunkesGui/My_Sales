import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../infra/database/repositories/ProductsRepositories";
import { Product } from "../infra/database/entities/Product";
import { IProductId } from "../domain/models/IProductId";

export default class ShowProductService {
  async execute({ id }: IProductId): Promise <Product>{
    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    return product;
  }
}
