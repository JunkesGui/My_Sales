import { Request, Response } from 'express'
import SendForgotPasswordService from '../services/SendForgotPasswordService';

export default class ForgotPasswordController{
  async create(request: Request, response: Response): Promise<Response>{
    const { email } = request.body;

    const sendForgotPassword = new SendForgotPasswordService();

    await sendForgotPassword.execute({ email })

    return response.status(204).json()
  }
}
