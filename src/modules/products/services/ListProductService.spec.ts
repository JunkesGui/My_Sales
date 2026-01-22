import DummyProductsRepositories from "../domain/repositories/dummies/DummyProductsRepositories";
import ListProductService from "./ListProductService";

let dummyProductRepositories: DummyProductsRepositories;
let listProduct: ListProductService;

describe('ListProductService', () =>{
  beforeEach(() =>{
    dummyProductRepositories = new DummyProductsRepositories();
    listProduct = new ListProductService(dummyProductRepositories);
  });

  it('Should be able to list all products with pagination', async () =>{
    const products = await listProduct.execute(1, 10)

    expect(products).toHaveProperty('total')
    expect(products).toHaveProperty('data')
  })
})
