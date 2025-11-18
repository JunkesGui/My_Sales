import AppError from "@shared/errors/AppError"
import { UserRepositories } from "../database/repositories/UsersRepositories"
import { User } from "../database/entities/User"
import { compare, hash } from "bcrypt"

interface IUpdateProfile{
  user_id: number,
  name: string,
  email: string,
  password: string,
  old_password: string
}

export default class UpdateProfileService{
  async execute({user_id, name, email, password, old_password}: IUpdateProfile): Promise< User >{
    const user = await UserRepositories.findById(user_id)

    if(!user){
      throw new AppError('User not found', 404)
    }

    if (email){
      const userUpdateEmail = await UserRepositories.findByEmail(email)

      if (userUpdateEmail){
        throw new AppError('This email is already being used', 409)
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError('Old Password is missing')
    }
    if (password && old_password){
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword){
        throw new AppError('Old password is incorrect')
      }

      user.password = await hash(password, 10)
    }

    if (name){
      user.name = name
    }

    await UserRepositories.save(user)

    return user
  }
}
