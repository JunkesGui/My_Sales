import AppError from "@shared/errors/AppError";
import { IShowProfile } from "../domain/models/IShowProfile";
import { inject, injectable } from "tsyringe";
import { IUserRepositories } from "../domain/repositories/IUserRepositories";
import { IUser } from "../domain/models/IUser";

@injectable()
export default class ShowProfileService{
  constructor(@inject('UserRepositories') private readonly userRepositories: IUserRepositories){}

  async execute({user_id}: IShowProfile): Promise<IUser | null>{
    const user = await this.userRepositories.findById(user_id)

    if(!user_id){
      throw new AppError('User not found', 404)
    }

    return user;
  }
}
