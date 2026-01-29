import UserToken from "@modules/users/infra/database/entities/UserToken";
import { IUserToken } from "../../models/IUserToken";
import { IUserTokenRepositories } from "../IUserTokenRepositories";

export default class DummyUserTokenRepositories implements IUserTokenRepositories{
  private userTokens: UserToken[] = [];

  async generate(user_id: number): Promise<IUserToken> {
    const userToken = new UserToken();

    userToken.id = this.userTokens.length + 1;
    userToken.user_id = user_id;

    this.userTokens.push(userToken);

    return userToken;
  }

  async save(token: IUserToken): Promise<void> {
    const findIndex = this.userTokens.findIndex(findToken => findToken.id === token.id);

    this.userTokens[findIndex] = token;
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = this.userTokens.find(ut => ut.token === token)

    return userToken as IUserToken | null
  }
}
