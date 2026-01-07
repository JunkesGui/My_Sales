import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories";
import ListCustomerService from "./ListCustomersService";

let dummyCustomerRepositories: DummyCustomerRepositories;
let listCusomerService: ListCustomerService;

describe('ListCustomerService', () => {
  beforeEach(async () =>{
    dummyCustomerRepositories = new DummyCustomerRepositories();
    listCusomerService = new ListCustomerService(dummyCustomerRepositories);
  });

  it('Should be able to list all customers with pagination', async () =>{
    const customers = await listCusomerService.execute(1, 10)

    expect(customers).toHaveProperty('total')
    expect(customers).toHaveProperty('data')
  })
})
