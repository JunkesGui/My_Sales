import AppError from "@shared/errors/AppError";
import { productMock } from "../domain/factories/productFactory";
import DummyProductsRepositories from "../domain/repositories/dummies/DummyProductsRepositories";
import { Product } from "../infra/database/entities/Product";
import CreateProductService from "./CreateProductService";
import ShowProductService from "./ShowProductService";

let dummyProductRepositories: DummyProductsRepositories;
let createProduct: CreateProductService;
let showProduct: ShowProductService;

describe('ShowProductService', () =>{
  beforeEach(() =>{
    dummyProductRepositories = new DummyProductsRepositories();
    createProduct = new CreateProductService(dummyProductRepositories);
    showProduct = new ShowProductService(dummyProductRepositories);
  });

  it('Should be able to show a singular product by its ID', async () =>{
    const product = await createProduct.execute(productMock);
    const p = await showProduct.execute({id: product.id});

    expect(p).toBeInstanceOf(Product)
  });

  it('Should not be able to find a invalid ID', async () =>{
    await expect(showProduct.execute({id: 2})).rejects.toBeInstanceOf(AppError)
  })
})
