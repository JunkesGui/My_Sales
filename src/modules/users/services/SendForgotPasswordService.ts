import AppError from "@shared/errors/AppError"
import { UserRepositories } from "../infra/database/repositories/UsersRepositories"
import { UserTokensRepositories } from "../infra/database/repositories/UserTokensRepositores"
import { sendEmail } from "@config/email"
import { IForgotPassword } from "../domain/models/IForgotPassword"

export default class SendForgotPasswordService{
  async execute({email}: IForgotPassword): Promise<void>{
    const user = await UserRepositories.findByEmail(email)

    if (!user){
      throw new AppError('User not found', 404)
    }

    const token = await UserTokensRepositories.generate(user.id)

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
      <p> Dear ${user.name},
       your recovery token is: <strong> ${token?.token} </strong> </p>`
    })
  }
}
