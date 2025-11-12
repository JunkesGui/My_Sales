import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";

interface ITokenPayLoad{
  iat: number,
  exp: number,
  sub: number
}

export default class AuthMiddleware {
  static execute(request: Request, response: Response, next: NextFunction): void{
    const authHeader = request.headers.authorization;

    if (!authHeader){
      throw new AppError('JWT Token is Missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret)

      const {sub} = decodedToken as unknown as ITokenPayLoad

      request.user = {
        id: sub
      }

      return next()
    } catch (error) {
      throw new AppError('Invalid JWT Token', 401)

    }
  }
}
