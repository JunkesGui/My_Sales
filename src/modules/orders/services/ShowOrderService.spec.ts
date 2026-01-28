import { customerMock } from "@modules/customers/domain/factories/customerFactory";
import DummyCustomerRepositories from "@modules/customers/domain/repositories/dummies/DummyCustomerRepositories";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import { productMock } from "@modules/products/domain/factories/productFactory";
import DummyProductsRepositories from "@modules/products/domain/repositories/dummies/DummyProductsRepositories";
import CreateProductService from "@modules/products/services/CreateProductService";
import AppError from "@shared/errors/AppError";
import DummyOrderRepositories from "../domain/repositories/dummies/DummyOrderRepositories";
import CreateOrderService from "./CreateOrderService";
import ShowOrderService from "./ShowOrderService";

let dummyOrderRepositories: DummyOrderRepositories;
let dummyCustomerRepositories: DummyCustomerRepositories;
let dummyProductRepositories: DummyProductsRepositories;
let createCustomer: CreateCustomerService;
let createProduct: CreateProductService;
let createOrder: CreateOrderService;
let showOrder: ShowOrderService

describe('ShowOrderService', () =>{
  beforeEach(() =>{
    dummyOrderRepositories = new DummyOrderRepositories();
    dummyCustomerRepositories = new DummyCustomerRepositories();
    dummyProductRepositories = new DummyProductsRepositories();
    createCustomer = new CreateCustomerService(dummyCustomerRepositories);
    createProduct = new CreateProductService(dummyProductRepositories);
    createOrder = new CreateOrderService(
      dummyOrderRepositories,
      dummyCustomerRepositories,
      dummyProductRepositories);
    showOrder = new ShowOrderService(dummyOrderRepositories);
  });

  it('Should be able to return an Order information by its ID', async () =>{
    const customer = await createCustomer.execute(customerMock)
    const product = await createProduct.execute(productMock)

    const order = await createOrder.execute({
      customer_id: customer.id,
      products: [product]
      })

    expect(await showOrder.execute(order.id)).toBe(order)
  });

  it('Should not be able to find an Order with an incorrect ID', async () =>{
    await expect(showOrder.execute(1)).rejects.toBeInstanceOf(AppError)
  });
})
