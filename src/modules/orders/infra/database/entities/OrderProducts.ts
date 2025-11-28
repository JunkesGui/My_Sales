import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "@modules/products/infra/database/entities/Product";
import { IOrderProduct } from "@modules/orders/domain/models/IOrderProduct";

@Entity('order_products')
export class OrdersProducts implements IOrderProduct{
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({name: 'order_id'})
  order: Order

  @Column({type: 'int'})
  order_id: number

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product

  @Column({type: 'int'})
  product_id: number

  @Column({type: 'decimal'})
  price: number

  @Column({type: 'int'})
  quantity: number

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date
}
