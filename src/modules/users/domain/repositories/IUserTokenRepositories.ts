import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepositories {
  findByToken(token: string): Promise<IUserToken | null>;
  generate(user_id: number): Promise<IUserToken>;
  save(token: IUserToken): Promise<void>;
}
