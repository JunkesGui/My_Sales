import AppError from "@shared/errors/AppError"
import { sendEmail } from "@config/email"
import { IForgotPassword } from "../domain/models/IForgotPassword"
import { inject, injectable } from "tsyringe"
import { IUserRepositories } from "../domain/repositories/IUserRepositories"
import { IUserTokenRepositories } from "../domain/repositories/IUserTokenRepositories"

@injectable()
export default class SendForgotPasswordService{
  constructor(
  @inject('UserRespositories') private readonly userRepositories: IUserRepositories,
  @inject('UserTokenRepositories') private readonly userTokenRepositories: IUserTokenRepositories
  ){}

  async execute({email}: IForgotPassword): Promise<void>{
    const user = await this.userRepositories.findByEmail(email)

    if (!user){
      throw new AppError('User not found', 404)
    }

    const token = await this.userTokenRepositories.generate(user.id)

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
      <p> Dear ${user.name},
       your recovery token is: <strong> ${token?.token} </strong> </p>`
    })
  }
}
