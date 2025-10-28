import { ObjectLiteral } from "node_modules/typeorm/common/ObjectLiteral";
import { Product } from "../database/entities/Product";
import { ProductsRepositories } from "../database/repositories/ProductsRepositories";

export default class ListProductService {
  async execute (): Promise<ObjectLiteral[]> {
    const products = await ProductsRepositories.find();
    return products;
  }
}
