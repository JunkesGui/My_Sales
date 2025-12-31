import AppError from "@shared/errors/AppError";
import path from "path";
import uploadConfig from "@config/upload"
import fs from "fs"
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";
import { inject, injectable } from "tsyringe";
import { IUserRepositories } from "../domain/repositories/IUserRepositories";
import { IUser } from "../domain/models/IUser";

@injectable()
export default class UpdateUserAvatarService{
  constructor(@inject('UserRepositories') private readonly userRepositories: IUserRepositories){}

  async execute({userId, avatarFileName}: IUpdateUserAvatar): Promise<IUser>{
    const user = await this.userRepositories.findById(userId)

    if (!user){
      throw new AppError('User not found', 404)
    }

    if (user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await this.userRepositories.save(user)

    return user
  }
}
