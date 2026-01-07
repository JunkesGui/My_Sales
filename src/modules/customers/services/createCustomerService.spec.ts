import AppError from "@shared/errors/AppError";
import { customerMock } from "../domain/factories/customerFactory";
import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories"
import CreateCustomerService from "./CreateCustomerService";

let dummyCustomerRepositories: DummyCustomerRepositories;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    dummyCustomerRepositories = new DummyCustomerRepositories();
    createCustomer = new CreateCustomerService(dummyCustomerRepositories);
  });

  it('Should be able to create Customer', async () =>{
    const customer = await createCustomer.execute(customerMock)

    expect(customer.name).toBe(customerMock)
  });

  it('Should not be able to create a Customer if the email already exists', async () =>{
    await createCustomer.execute(customerMock);

    await expect(createCustomer.execute(customerMock)).rejects.toBeInstanceOf(AppError)
  })

})
