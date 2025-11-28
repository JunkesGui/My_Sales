import AppError from "@shared/errors/AppError"
import { UserTokensRepositories } from "../infra/database/repositories/UserTokensRepositores"
import { UserRepositories } from "../infra/database/repositories/UsersRepositories"
import { isAfter, addHours } from 'date-fns'
import { hash } from "bcrypt"
import { IResetPassword } from "../domain/models/IResetPassword"

export default class ResetPasswordService{
  async execute({token, password}: IResetPassword): Promise<void>{
    const userToken = await UserTokensRepositories.findByToken(token)

    if (!userToken){
      throw new AppError('Incorrect user token', 404)
    }

    const user = await UserRepositories.findById(userToken.user_id)

    if(!user){
      throw new AppError('User not found', 404)
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token Expired', 401)
    }

    user.password = await hash(password, 10)

    await UserRepositories.save(user)

  }
}
