import AppError from "@shared/errors/AppError";
import { Product } from "../infra/database/entities/Product";
import { IProductId } from "../domain/models/IProductId";
import { IProductRepositories } from "../domain/repositories/IProductRepositories";
import { injectable, inject } from "tsyringe";

@injectable()
export default class ShowProductService {
  constructor(@inject('ProductRepositories') private readonly productRepositories: IProductRepositories){}

  async execute({ id }: IProductId): Promise <Product>{
    const product = await this.productRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    return product;
  }
}
