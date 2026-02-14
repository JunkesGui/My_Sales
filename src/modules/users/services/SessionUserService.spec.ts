import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userMock } from "../domain/factories/userFactory";
import DummyUserRepositories from "../domain/repositories/dummies/DummyUserRepositories";
import CreateUserService from "./CreateUserService";
import SessionUserService from "./SessionUserService";

let dummyUserRepositories: DummyUserRepositories;
let createUser: CreateUserService;
let sessionUser: SessionUserService;

jest.mock('bcrypt', () =>{
  compare: jest.fn();
  hash: jest.fn();
});

jest.mock('jsonwebtoken', () =>{
  sign: jest.fn(() => 'fake-token')
})

describe('SessionUserService', () =>{
  beforeEach(() =>{
    dummyUserRepositories = new DummyUserRepositories();
    createUser = new CreateUserService(dummyUserRepositories);
    sessionUser = new SessionUserService(dummyUserRepositories);
  });

  it('Should be able to generate a session token for the User', async () =>{
    const user = await createUser.execute(userMock);
    const { email, password } = user;

    const response = await sessionUser.execute({ email, password })
    console.log(response)

    expect(response).toHaveProperty('token')

  })
})
