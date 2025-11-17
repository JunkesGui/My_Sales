import AppError from "@shared/errors/AppError"
import { UserRepositories } from "../database/repositories/UsersRepositories"
import { UserTokensRepositories } from "../database/repositories/UserTokensRepositores"

interface IForgotPassword{
  email: string
}

export default class SendForgotPasswordService{
  async execute({email}: IForgotPassword): Promise<void>{
    const user = await UserRepositories.findByEmail(email)

    if (!user){
      throw new AppError('User not found', 404)
    }

    const token = await UserTokensRepositories.generate(user.id)

    console.log(token)
  }
}
