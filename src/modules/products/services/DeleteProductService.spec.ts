import AppError from "@shared/errors/AppError";
import { productMock } from "../domain/factories/productFactory";
import DummyProductsRepositories from "../domain/repositories/dummies/DummyProductsRepositories";
import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";

let dummyProductRepositories: DummyProductsRepositories;
let createProduct: CreateProductService
let deleteProduct: DeleteProductService;

describe('DeleteProductService', () =>{
  beforeEach(() =>{
    dummyProductRepositories = new DummyProductsRepositories();
    createProduct = new CreateProductService(dummyProductRepositories);
    deleteProduct = new DeleteProductService(dummyProductRepositories);
  });

  it('Should be able to delete a Product', async () =>{
    const product = await createProduct.execute(productMock);
    await deleteProduct.execute({id: product.id});

    expect(await dummyProductRepositories.findById(product.id)).toBeUndefined();
  });

  it('Should not be able to delete an incorrect id', async () =>{
    await expect(deleteProduct.execute({id: 2})).rejects.toBeInstanceOf(AppError)
  })
})
