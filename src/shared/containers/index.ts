import { ICustomerRepositories } from "@modules/customers/domain/repositories/ICustomerRepositories";
import CustomerRepositories from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { container } from "tsyringe";

export default container.registerSingleton<ICustomerRepositories>('CustomerRepositories', CustomerRepositories)
