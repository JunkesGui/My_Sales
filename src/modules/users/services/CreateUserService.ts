import AppError from "@shared/errors/AppError";
import { User } from "../infra/database/entities/User";
import { UserRepositories } from "../infra/database/repositories/UsersRepositories";
import { hash } from "bcrypt";
import { ICreateUser } from "../domain/models/ICreateUser";

export default class CreateUserService{
  async execute({name, email, password}: ICreateUser): Promise<User>{
    const userExists = await UserRepositories.findByEmail(email)

    if (userExists){
      throw new AppError('There is already a product with this name', 409);
    }

    const hashedPassword = await hash(password, 10)

    const user = UserRepositories.create({
      name,
      email,
      password: hashedPassword
    });

    await UserRepositories.save(user)

    return user
  }
}
