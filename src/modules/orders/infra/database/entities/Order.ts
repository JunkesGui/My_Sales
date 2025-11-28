import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrdersProducts } from "./OrderProducts";
import { IOrder } from "@modules/orders/domain/models/IOrder";

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {cascade: true})
  order_products: OrdersProducts[]

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date
}
