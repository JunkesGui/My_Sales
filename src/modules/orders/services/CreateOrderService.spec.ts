import { customerMock } from "@modules/customers/domain/factories/customerFactory";
import DummyCustomerRepositories from "@modules/customers/domain/repositories/dummies/DummyCustomerRepositories";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import { productMock, productMock2, productMockModified } from "@modules/products/domain/factories/productFactory";
import DummyProductsRepositories from "@modules/products/domain/repositories/dummies/DummyProductsRepositories";
import CreateProductService from "@modules/products/services/CreateProductService";
import AppError from "@shared/errors/AppError";
import DummyOrderRepositories from "../domain/repositories/dummies/DummyOrderRepositories"
import CreateOrderService from "./CreateOrderService";

let dummyOrderRepositories: DummyOrderRepositories;
let dummyCustomerRepositories: DummyCustomerRepositories;
let dummyProductRepositories: DummyProductsRepositories;
let createCustomer: CreateCustomerService;
let createProduct: CreateProductService;
let createOrder: CreateOrderService;

describe('CreateOrderService', () =>{
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
  });

  it('Should be able to create an Order and update the products quantity', async () =>{
    const customer = await createCustomer.execute(customerMock)
    const product = await createProduct.execute(productMock)
    const parseProduct = {id: product.id, price: product.price, quantity: product.quantity}

    const order = await createOrder.execute({
      customer_id: customer.id,
      products: [product]
      })

    const p = await dummyProductRepositories.findById(product.id)

    expect(order.customer).toBe(customer)
    expect(order.order_products).toMatchObject([parseProduct])
    expect(p?.quantity).toBe(product.quantity - order.order_products[0].quantity)
  });

  it('Should not be able to create an Order with an invalid Customer ID', async () =>{
    const product = await createProduct.execute(productMock)

    await expect(createOrder.execute({ customer_id: 1, products: [product] }))
    .rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create an Order if no Product was found', async () =>{
    const customer = await createCustomer.execute(customerMock)

    await expect(createOrder.execute({ customer_id: customer.id, products: [{id: 1, quantity: 1}] }))
    .rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create an Order requiring a Product quantity unavailable', async () =>{
    const customer = await createCustomer.execute(customerMock)
    const product = await createProduct.execute(productMock)

    await expect(createOrder.execute(
      {
      customer_id: customer.id,
      products: [{id: product.id, quantity: product.quantity + 1}]
      }))
    .rejects.toBeInstanceOf(AppError)
  });

  it('Should be able to create an Order and update multiple Products quantity', async () =>{
    const customer = await createCustomer.execute(customerMock)
    const product = await createProduct.execute(productMock)
    const product2 = await createProduct.execute(productMock2)
    const product3 = await createProduct.execute(productMockModified)

    const order = await createOrder.execute({
      customer_id: customer.id,
      products: [product, product2, product3]
    })

    const p = await dummyProductRepositories.findById(product.id)
    const p2 = await dummyProductRepositories.findById(product2.id)
    const p3 = await dummyProductRepositories.findById(product3.id)

    expect(p?.quantity).toBe(product.quantity - order.order_products[0].quantity)
    expect(p2?.quantity).toBe(product2.quantity - order.order_products[1].quantity)
    expect(p3?.quantity).toBe(product3.quantity - order.order_products[2].quantity)
  })
})
