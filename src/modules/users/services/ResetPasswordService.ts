import AppError from "@shared/errors/AppError"
import { isAfter, addHours } from 'date-fns'
import { hash } from "bcrypt"
import { IResetPassword } from "../domain/models/IResetPassword"
import { inject, injectable } from "tsyringe"
import { IUserRepositories } from "../domain/repositories/IUserRepositories"
import { IUserTokenRepositories } from "../domain/repositories/IUserTokenRepositories"

@injectable()
export default class ResetPasswordService{
  constructor(
  @inject('UserRespositories') private readonly userRepositories: IUserRepositories,
  @inject('UserTokenRepositories') private readonly userTokenRepositories: IUserTokenRepositories
  ){}

  async execute({token, password}: IResetPassword): Promise<void>{
    const userToken = await this.userTokenRepositories.findByToken(token)

    if (!userToken){
      throw new AppError('Incorrect user token', 404)
    }

    const user = await this.userRepositories.findById(userToken.user_id)


    if(!user){
      throw new AppError('User not found', 404)
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token Expired', 401)
    }

    user.password = await hash(password, 10)

    await this.userRepositories.save(user)

  }
}
