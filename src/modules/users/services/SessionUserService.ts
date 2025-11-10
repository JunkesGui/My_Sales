import AppError from "@shared/errors/AppError"
import { User } from "../database/entities/User"
import { UserRepositories } from "../database/repositories/UsersRepositories"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface ISessionUser{
  email: string,
  password: string
}

interface ISessionResponse{
  user: User,
  token: string
}

export default class SessionUserService {
  async execute({email, password}: ISessionUser): Promise<ISessionResponse>{
    const user = await UserRepositories.findByEmail(email)

    if(!user){
      throw new AppError('Incorrect email or password', 401)
    }

    const passwordConfirmation = await compare(password, user.password)

    if (!passwordConfirmation){
      throw new AppError('Incorrect email or password', 401)
    }

    const token = sign({},
       process.env.APP_SECRET as string,
       {subject: String(user.id), expiresIn: '1d'})

  return {
    user,
    token
  }
  }


}
