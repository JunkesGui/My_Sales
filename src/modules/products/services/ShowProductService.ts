import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";
import { ObjectLiteral } from "node_modules/typeorm/common/ObjectLiteral";

interface IShowProduct{
  id: string;
}

export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise <ObjectLiteral>{
    const product = await ProductsRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found', 404)
    }

    return product;
  }
}
