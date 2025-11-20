import { OrdersProducts } from "@modules/orders/database/entities/OrderProducts";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('products')
export class Product{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'decimal'})
  price: number;

  @Column({type: 'int'})
  quantity: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.product, {cascade: true})
  order_products: OrdersProducts[]

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;

}
