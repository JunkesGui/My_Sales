import DummyCustomerRepositories from "../domain/repositories/dummies/DummyCustomerRepositories"
import CreateCustomerService from "./CreateCustomerService";

describe('CreateCustomerService', () =>{
  it('Should be able to create Customer', async () =>{
    const dummyCustomerRepositories = new DummyCustomerRepositories();
    const createCustomer = new CreateCustomerService(dummyCustomerRepositories);

    const customer = await createCustomer.execute({
      name: 'foo',
      email: 'foo@mail.com',
    })

    expect(customer.name).toBe('foo')
  })
})
