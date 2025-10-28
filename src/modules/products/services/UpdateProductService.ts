import AppError from "@shared/errors/AppError";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";
import { ObjectLiteral } from "node_modules/typeorm/common/ObjectLiteral";

interface IUpdateProduct{
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService{
  async execute({id, name, price, quantity}: IUpdateProduct): Promise<ObjectLiteral>{
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

    return product
  }
}
