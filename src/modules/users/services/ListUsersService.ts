import { User } from "../infra/database/entities/User";
import { UserRepositories } from "../infra/database/repositories/UsersRepositories";

export default class ListUsersService {
  async execute (): Promise<User[]> {
    const users = await UserRepositories.find();
    return users;
  }
}
