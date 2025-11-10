import { User } from "../database/entities/User";
import { UserRepositories } from "../database/repositories/UsersRepositories";

export default class ListUsersService {
  async execute (): Promise<User[]> {
    const users = await UserRepositories.find();
    return users;
  }
}
