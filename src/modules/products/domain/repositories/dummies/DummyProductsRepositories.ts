import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IProductPaginate } from "@modules/products/domain/models/IProductPaginate";
import { IFindProducts, IProductRepositories } from "@modules/products/domain/repositories/IProductRepositories";
import AppError from "@shared/errors/AppError";
import { Pagination } from "@shared/interfaces/Pagination";
import { SearchParams } from "@shared/interfaces/SearchParams";
import { Product } from "../../../infra/database/entities/Product";

export default class DummyProductsRepositories implements IProductRepositories{
  private products: Product[] = [];

  async create({name, price, quantity}: ICreateProduct): Promise<Product>{
  const product = new Product();

  product.id = this.products.length + 1;
  product.name = name;
  product.price = price;
  product.quantity = quantity;

  this.products.push(product);

  return product;
  }

  async save(product: Product): Promise<Product>{
    const findIndex = this.products.findIndex(findProduct => findProduct.id === product.id)

    this.products[findIndex] = product;

    return product;
  }

  async remove(product: Product): Promise<void>{
    const index = this.products.findIndex(findProduct => findProduct.id === product.id)
    if (index !== -1){
      this.products = this.products.filter((p) => p.id !== index + 1)
    }
  }

  async findAll({page, skip, take}: SearchParams): Promise<IProductPaginate> {
    const products = this.products
    const count = this.products.length

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result as IProductPaginate
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name)
    return product as Product | null
  }

  async findById(id: number): Promise<Product | null> {
    const product = this.products.find(product => product.id === id)

    return product as Product | null
  }

  async findAndCount(pagination: Pagination): Promise<[Product[], number]> {
    throw new AppError('Funcao nao implementada', 400)
  }

  async updateQuantity(products: Product[]): Promise<void>{  // TODO: TESTAR INDIVIDUALMENTE
    products.forEach(p =>{
      const findIndex = this.products.findIndex(product => p.id === product.id)

      this.products[findIndex] = p;
    });
  }

  async findAllById(products: IFindProducts[]): Promise<Product[] | null> {
    const prodsIds = products.map(prod => prod.id)
    const foundIds = this.products.filter(p => prodsIds.includes(p.id))

    return foundIds as Product[] | null
  }
}
