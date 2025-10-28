import { AppDataSource } from "@shared/typeorm/data-source";
import { Product } from "../entities/Product";
import { ObjectLiteral } from "node_modules/typeorm/index";

export const ProductsRepositories = AppDataSource.getRepository(Product).extend({
    async findByName(name: string): Promise<ObjectLiteral | null>{
      return this.findOneBy({ name });
    },
    async findById(id: string): Promise<ObjectLiteral | null>{
      return this.findOneBy({ id });
    },
  }
);
