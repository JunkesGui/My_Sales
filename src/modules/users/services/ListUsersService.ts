import { inject, injectable } from "tsyringe";
import { User } from "../infra/database/entities/User";
import { IUserRepositories } from "../domain/repositories/IUserRepositories";
import { IUserPaginate } from "../domain/models/IUserPaginate";
import RedisCache from "@shared/cache/RedisCache";

@injectable()
export default class ListUsersService {
  constructor(@inject('UserRepositories') private readonly userRepositories: IUserRepositories){}

  async execute(page: number, limit: number): Promise<IUserPaginate> {
    const redisCache = new RedisCache()

    let find = await redisCache.recover<IUserPaginate>('api-mysales-USER_LIST')

    if(!find || find.current_page != page){
      find = await this.userRepositories.findAll({ page, take: limit, skip: (page -1) * limit})
      await redisCache.save('api-mysales-USER_LIST', JSON.stringify(find))
    }

    const total = find.total

    const totalPages = Math.ceil(total / limit)

    return {
      per_page: limit,
      total,
      data: find.data,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page +1: null,
      previous_page: page > 1 ? page -1: null,
    }
  }
}
