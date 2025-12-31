import { User } from "@modules/users/infra/database/entities/User";
import { IUser } from "./IUser";

export interface ISessionResponse{
  user: IUser,
  token: string
}
