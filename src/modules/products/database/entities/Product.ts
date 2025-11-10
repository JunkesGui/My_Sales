import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'decimal'})
  price: number;

  @Column({type: 'int'})
  quantity: number;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;

}
