import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';

import * as uuid from 'uuid';
import { AuthTypeorm } from './auth';
import { User } from '../../../entities/user/user.entity';

@Entity('User')
export class UserTypeorm implements User {
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

  @OneToOne(() => AuthTypeorm, auth => auth.id)
  @JoinColumn()
  auth?: AuthTypeorm;

  constructor(data: UserTypeorm) {
    return Object.assign(this, {
      ...data,
      id: uuid.v4()
    });
  }

  static create(data: UserTypeorm) {
    const user = new UserTypeorm({
      ...data,
      id: uuid.v4()
    });
    return user;
  }
}
