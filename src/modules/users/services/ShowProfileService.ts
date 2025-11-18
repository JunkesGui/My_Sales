import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { UserRepositories } from "../database/repositories/UsersRepositories";

interface IShowProfile{
  user_id: number
}

export default class ShowProfileService{
  async execute({user_id}: IShowProfile): Promise<User | null>{
    const user = await UserRepositories.findById(user_id)

    if(!user_id){
      throw new AppError('User not found', 404)
    }

    return user;
  }
}
