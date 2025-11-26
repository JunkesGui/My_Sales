import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Product } from "../entities/Product";
import { In } from 'typeorm'

interface IFindProducts{
  id: number
}


export const ProductsRepositories = AppDataSource.getRepository(Product).extend({
    async findByName(name: string): Promise<Product | null>{
      return this.findOneBy({ name });
    },
    async findById(id: number): Promise<Product | null>{
      return this.findOneBy({ id });
    },
    async findAllById(products: IFindProducts[]): Promise<Product[] | null>{
      const productIds = products.map(product => product.id)
      const existentProducts = await this.find({where: { id: In(productIds) }})

      return existentProducts
    }
  }
);
