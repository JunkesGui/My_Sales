import AppError from "@shared/errors/AppError";
import { customerMock } from "../domain/factories/customerFactory";
import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";

let dummyCustomerRepositories: DummyCustomerRepositories;
let deleteCustomer: DeleteCustomerService
let createCustomer: CreateCustomerService

describe('DeleteCustomerService', () => {
  beforeEach(async () => {
    dummyCustomerRepositories = new DummyCustomerRepositories();
    deleteCustomer = new DeleteCustomerService(dummyCustomerRepositories);
    createCustomer = new CreateCustomerService(dummyCustomerRepositories);
  });

  it('Should be able to delete Customer', async () =>{
    const customer = await createCustomer.execute(customerMock)
    await deleteCustomer.execute({id: customer.id})

    expect(await dummyCustomerRepositories.findById(customer.id)).toBeUndefined()
  });

  it('Should not be able to delete a unexistent ID', async () =>{
    await expect(deleteCustomer.execute({id: 2})).rejects.toBeInstanceOf(AppError)
  })

})
