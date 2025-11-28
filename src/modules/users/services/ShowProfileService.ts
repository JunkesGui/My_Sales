import AppError from "@shared/errors/AppError";
import { User } from "../infra/database/entities/User";
import { UserRepositories } from "../infra/database/repositories/UsersRepositories";
import { IShowProfile } from "../domain/models/IShowProfile";

export default class ShowProfileService{
  async execute({user_id}: IShowProfile): Promise<User | null>{
    const user = await UserRepositories.findById(user_id)

    if(!user_id){
      throw new AppError('User not found', 404)
    }

    return user;
  }
}
