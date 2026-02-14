import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { App } from "supertest/types"
import appPromise from '@shared/infra/http/server'
import request from "supertest";
import { userMock } from "@modules/users/domain/factories/userFactory";

describe('Create User Integration', () =>{
  let app:App;

  beforeAll(async () =>{
    await AppDataSource.initialize();
    app = (await appPromise) as App;
  })

  afterAll(async() => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities){
      const repository = AppDataSource.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    }
    await AppDataSource.destroy()
  })

  it('Should be able to create a new user', async () =>{
    const response = await request(app).post('/users').send(userMock)

    expect(response.status).toBe(200)
    expect(response.body.email).toBe(userMock.email)
  })
})
