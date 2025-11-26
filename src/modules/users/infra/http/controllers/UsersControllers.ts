import type { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateUserService from "@modules/users/services/CreateUserService";
import ListUsersService from "@modules/users/services/ListUsersService";

export default class UserControllers{
  async index (request: Request, response: Response): Promise<Response>{
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();
    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password
    });
    return response.json(instanceToInstance(user))
  }

}

