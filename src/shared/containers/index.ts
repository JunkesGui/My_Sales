import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import CustomerRepositories from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { IOrderRepositories } from "@modules/orders/domain/repositories/IOrderRepositories";
import OrderRepositories from "@modules/orders/infra/database/repositories/OrderRepositories";
import { IProductRepositories } from "@modules/products/domain/repositories/IProductRepositories";
import ProductsRepositories from "@modules/products/infra/database/repositories/ProductsRepositories";
import { IUserRepositories } from "@modules/users/domain/repositories/IUserRepositories";
import { IUserTokenRepositories } from "@modules/users/domain/repositories/IUserTokenRepositories";
import UserRepositories from "@modules/users/infra/database/repositories/UsersRepositories";
import UserTokenRepositories from "@modules/users/infra/database/repositories/UserTokenRepositores";
import { container } from "tsyringe";

container.registerSingleton<ICustomerRepositories>('CustomerRepositories', CustomerRepositories)
container.registerSingleton<IProductRepositories>('ProductRepositories', ProductsRepositories)
container.registerSingleton<IOrderRepositories>('OrderRepositories', OrderRepositories)
container.registerSingleton<IUserRepositories>('UserRepositories', UserRepositories)
container.registerSingleton<IUserTokenRepositories>('UserTokenRepositories', UserTokenRepositories)
