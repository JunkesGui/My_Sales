import SessionUserService from "@modules/users/services/SessionUserService";
import type { Request, Response} from "express"

export default class SessionsControllers{
  async create(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;
    const createSession = new SessionUserService();

    const userToken = await createSession.execute({
      email, password
    })

    return response.json(userToken)
  }
}
