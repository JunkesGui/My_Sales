import DummyUserRepositories from "../domain/repositories/dummies/DummyUserRepositories";
import ListUsersService from "./ListUsersService";

let dummyUserRepositories: DummyUserRepositories;
let listUsers: ListUsersService;

describe('ListUsersService', () =>{
  beforeEach(() =>{
    dummyUserRepositories = new DummyUserRepositories();
    listUsers = new ListUsersService(dummyUserRepositories);
  });

  it('Should be able to list all users with pagination', async () =>{
    const users = await listUsers.execute(1,10)

    expect(users).toHaveProperty('total')
    expect(users).toHaveProperty('data')
  });
})
