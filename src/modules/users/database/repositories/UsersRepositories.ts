import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { User } from "../entities/User";

export const UserRepositories = AppDataSource.getRepository(User).extend({
    async findByName(name: string): Promise<User | null>{
      return this.findOneBy({ name });
    },
    async findByEmail(email: string): Promise<User | null>{
      return this.findOneBy({ email });
    },
    async findById(id: number): Promise<User | null>{
      return this.findOneBy({ id });
    },
  }
);
