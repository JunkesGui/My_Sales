import AppError from "@shared/errors/AppError";
import { customerMock, customerMock2, customerModifiedMock } from "../domain/factories/customerFactory";
import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories";
import CreateCustomerService from "./CreateCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";

let dummyCustomerRepositories: DummyCustomerRepositories;
let createCustomer: CreateCustomerService;
let updateCustomer: UpdateCustomerService

describe('UpdateCustomerService', () =>{
  beforeEach(() =>{
    dummyCustomerRepositories = new DummyCustomerRepositories();
    createCustomer = new CreateCustomerService(dummyCustomerRepositories);
    updateCustomer = new UpdateCustomerService(dummyCustomerRepositories);
  });

  it('Should be able to update a customer data by ID', async () =>{
    const customer = await createCustomer.execute(customerMock)

    await updateCustomer.execute({
      id: customer.id,
      name: customerModifiedMock.name,
      email: customerModifiedMock.email
    })

    expect(customer.name).toBe(customerModifiedMock.name)
  });

  it('Should not be able to find an invalid ID', async () =>{
    await expect(updateCustomer.execute({
      id: 2,
      name: customerModifiedMock.name,
      email: customerModifiedMock.email
    }))
      .rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to update a customer email to an already existing one', async () =>{
    const customer = await createCustomer.execute(customerMock)
    await createCustomer.execute(customerMock2)

    await expect(updateCustomer.execute({
      id: customer.id,
      name: customerModifiedMock.name,
      email: customerMock2.email
    }))
    .rejects.toBeInstanceOf(AppError)

  })
})
