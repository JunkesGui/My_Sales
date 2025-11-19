import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "@modules/products/database/entities/Product";

@Entity('order_products')
export class OrdersProducts{
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({name: 'order_id'})
  order: Order

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product

  @Column({type: 'decimal'})
  price: number

  @Column({type: 'int'})
  quantity: number

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date
}
