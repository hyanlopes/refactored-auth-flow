import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import * as uuid from 'uuid';
import { Auth } from '../auth/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  email: string;

  @OneToOne(() => Auth, auth => auth.id)
  auth?: Auth;

  constructor(data: User) {
    return Object.assign(this, {
      ...data,
      id: uuid.v4()
    });
  }

  static create(data: User) {
    const user = new User({
      ...data,
      id: uuid.v4()
    });
    return user;
  }
}
