import AppError from "@shared/errors/AppError";
import { productMock } from "../domain/factories/productFactory";
import DummyProductsRepositories from "../domain/repositories/dummies/DummyProductsRepositories";
import CreateProductService from "./CreateProductService";

let dummyProductRepositories: DummyProductsRepositories;
let createProduct: CreateProductService;

describe('CreateProductService', () =>{
  beforeEach(() =>{
    dummyProductRepositories = new DummyProductsRepositories();
    createProduct = new CreateProductService(dummyProductRepositories);
  });

  it('Should be able to create a Product', async () =>{
    const product = await createProduct.execute(productMock)

    expect(product.name).toBe(productMock.name)
  });

  it('Should not be able to create a Product with a already existing name', async () =>{
    await createProduct.execute(productMock);

    await expect(createProduct.execute(productMock)).rejects.toBeInstanceOf(AppError);
  })
})
