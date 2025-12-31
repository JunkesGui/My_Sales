import { AppDataSource } from "@shared/infra/typeorm/data-source";
import UserToken from "../entities/UserToken";
import { IUserTokenRepositories } from "@modules/users/domain/repositories/IUserTokenRepositories";
import { Repository } from "typeorm";
import { IUserToken } from "@modules/users/domain/models/IUserToken";

export default class UserTokenRepositories implements IUserTokenRepositories {
  private ormRepository: Repository<UserToken>;

  constructor(){
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  async findByToken(token: string): Promise<IUserToken | null>{
    const userToken = await this.ormRepository.findOneBy({token})
    return userToken
  }

  async generate(user_id: number): Promise<IUserToken>{
    const userToken = this.ormRepository.create({
      user_id
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  async save(token: IUserToken): Promise<void>{
    await this.ormRepository.save(token);

    return;
  }
}

