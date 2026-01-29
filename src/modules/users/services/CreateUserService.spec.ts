import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/userFactory";
import DummyUserRepositories from "../domain/repositories/dummies/DummyUserRepositories";
import CreateUserService from "./CreateUserService";

let dummyUserRepositories: DummyUserRepositories;
let createUser: CreateUserService;

describe('CreateUserService', () =>{
  beforeEach(() =>{
    dummyUserRepositories = new DummyUserRepositories();
    createUser = new CreateUserService(dummyUserRepositories);
  });

  it('Should be able to create an User', async () =>{
    const user = await createUser.execute(userMock)

    expect(user.name).toBe(userMock.name)
  });

  it('Should not be able to create an User with a email already in use', async () =>{
    const user = await createUser.execute(userMock)

    await expect(createUser.execute(userMock)).rejects.toBeInstanceOf(AppError)
  })
})
