import AppError from "@shared/errors/AppError";
import { productMock, productMock2, productMockModified } from "../domain/factories/productFactory";
import DummyProductsRepositories from "../domain/repositories/dummies/DummyProductsRepositories";
import CreateProductService from "./CreateProductService";
import UpdateProductService from "./UpdateProductService";

let dummyProductRepositories: DummyProductsRepositories;
let createProduct: CreateProductService;
let updateProduct: UpdateProductService;

describe('UpdateProductService', () =>{
  beforeEach(() =>{
  dummyProductRepositories = new DummyProductsRepositories();
  createProduct = new CreateProductService(dummyProductRepositories);
  updateProduct = new UpdateProductService(dummyProductRepositories);
  })

it('Should be able to update a product data by ID', async () =>{
  const product = await createProduct.execute(productMock)

  await updateProduct.execute({
    id: product.id,
    name: productMockModified.name,
    price: productMockModified.price,
    quantity: productMockModified.quantity
  });

  expect(product.name).toBe(productMockModified.name)
});

it('Should not be able to find an invalid ID', async () =>{
  await expect(updateProduct.execute({
    id: 2,
    name: productMockModified.name,
    price: productMockModified.price,
    quantity: productMockModified.quantity
  })).rejects.toBeInstanceOf(AppError)
});

it('Should not be able to update a product name to an already existing one', async() =>{
  const product = await createProduct.execute(productMock)
  await createProduct.execute(productMock2)

  await expect(updateProduct.execute({
    id: product.id,
    name: productMock2.name,
    price: productMockModified.price,
    quantity: productMockModified.quantity
  })).rejects.toBeInstanceOf(AppError)
})
});
