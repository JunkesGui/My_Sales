import AppError from "@shared/errors/AppError";
import { User } from "../infra/database/entities/User";
import { hash } from "bcrypt";
import { ICreateUser } from "../domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import { IUserRepositories } from "../domain/repositories/IUserRepositories";
import { IUser } from "../domain/models/IUser";
import RedisCache from "@shared/cache/RedisCache";

@injectable()
export default class CreateUserService{
  constructor(@inject('UserRepositories') private readonly userRepositories: IUserRepositories){}

  async execute({name, email, password}: ICreateUser): Promise<IUser>{
    const redisCache = new RedisCache()

    const userExists = await this.userRepositories.findByEmail(email)

    if (userExists){
      throw new AppError('There is already a product with this name', 409);
    }

    const hashedPassword = await hash(password, 10)

    const user = this.userRepositories.create({
      name,
      email,
      password: hashedPassword
    });
    await redisCache.invalidate('api-mysales-CUSTOMER_LIST')

    return user
  }
}
