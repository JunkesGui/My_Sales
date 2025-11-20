import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";

interface IShowProduct{
  id: number;
}

export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise <Product>{
    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    return product;
  }
}
