import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

interface IDeleteProduct{
  id: number;
}

export default class DeleteProductService{
  async execute({id}: IDeleteProduct): Promise<void>{
    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    await ProductsRepositories.remove(product)
  }
}
