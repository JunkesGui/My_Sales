import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import CustomerRepositories from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { IProductRepositories } from "@modules/products/domain/repositories/IProductRepositories";
import ProductsRepositories from "@modules/products/infra/database/repositories/ProductsRepositories";
import { container } from "tsyringe";

container.registerSingleton<ICustomerRepositories>('CustomerRepositories', CustomerRepositories)
container.registerSingleton<IProductRepositories>('ProductRepositories', ProductsRepositories)

