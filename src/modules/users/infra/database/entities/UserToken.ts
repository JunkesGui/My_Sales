import { IUserToken } from "@modules/users/domain/models/IUserToken";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_tokens')
export default class UserToken implements IUserToken{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  @Generated('uuid')
  token: string;

  @Column({type: 'int'})
  user_id: number;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;
}
