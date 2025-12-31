import type { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateUserService from "@modules/users/services/CreateUserService";
import ListUsersService from "@modules/users/services/ListUsersService";
import { container } from "tsyringe";

export default class UserControllers{
  async index (request: Request, response: Response): Promise<Response>{
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const listUsersService = container.resolve(ListUsersService);
    const users = await listUsersService.execute(page, limit);
    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password
    });
    return response.json(instanceToInstance(user))
  }

}

