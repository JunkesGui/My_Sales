import AppError from "@shared/errors/AppError";
import { customerMock } from "../domain/factories/customerFactory";
import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories";
import { Customer } from "../infra/database/entities/Customer";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";

let dummyCustomerRepositories: DummyCustomerRepositories;
let showCustomerService: ShowCustomerService;
let createCustomer: CreateCustomerService;

describe('ShowCustomerService', () =>{
  beforeEach(() =>{
    dummyCustomerRepositories = new DummyCustomerRepositories();
    showCustomerService = new ShowCustomerService(dummyCustomerRepositories);
    createCustomer = new CreateCustomerService(dummyCustomerRepositories);
  });

  it('Should be able to show a singular customer by its ID', async () =>{
    const customer = await createCustomer.execute(customerMock);
    const c = await showCustomerService.execute({id: customer.id});

    expect(c).toBeInstanceOf(Customer)
  });

  it('Should not be able to find a invalid ID', async () =>{
    await expect(showCustomerService.execute({id: 2})).rejects.toBeInstanceOf(AppError)
  })
})
