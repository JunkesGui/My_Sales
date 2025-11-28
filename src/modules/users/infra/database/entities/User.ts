import { IUser } from "@modules/users/domain/models/IUser";
import { Exclude, Expose } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User implements IUser{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  @Exclude()
  password: string;

  @Column({type: 'text'})
  avatar: string;

  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updated_at: Date;

  @Expose({name: 'avatar_url'})
  getAvatarUrl(): string | null{
    if(!this.avatar) return null
    return `${process.env.APP_API_URL}/files/${this.avatar}`
  }

}
