import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/userFactory";
import DummyUserRepositories from "../domain/repositories/dummies/DummyUserRepositories";
import CreateUserService from "./CreateUserService";
import ShowProfileService from "./ShowProfileService";

let dummyUserRepositories: DummyUserRepositories;
let createUser: CreateUserService;
let showProfile: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() =>{
    dummyUserRepositories = new DummyUserRepositories();
    createUser = new CreateUserService(dummyUserRepositories);
    showProfile = new ShowProfileService(dummyUserRepositories);
  });

  it("Should be able to show an User's profile", async () =>{
    const user = await createUser.execute(userMock)
    const profile = await showProfile.execute({user_id: user.id})
    expect(profile?.name).toBe(userMock.name)
  });

  it('Should not be able to find an Invalid User ID', async () =>{
    await expect(showProfile.execute({user_id: 1})).rejects.toBeInstanceOf(AppError)
  })

})
