import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";
import { ObjectLiteral } from "node_modules/typeorm/common/ObjectLiteral";

interface ICreateProduct{
  name: string,
  price: number,
  quantity: number
}

export default class CreateProductService{
  async execute({name, price, quantity}: ICreateProduct): Promise<ObjectLiteral>{
    const productExists = await ProductsRepositories.findByName(name)

    if (productExists){
      throw new AppError('There is already a product with this name', 409);
    }

    const product = ProductsRepositories.create({
      name, price, quantity
    });

    await ProductsRepositories.save(product)

    return product
  }
}
