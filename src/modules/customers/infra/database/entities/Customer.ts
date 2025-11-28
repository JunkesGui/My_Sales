import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
export class Customer implements ICustomer{
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  name: string

  @Column({type: 'text'})
  email: string

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date
}
