import * as uuid from 'uuid';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeorm } from './user';

import { Auth } from '../../../entities/auth/auth.entity';

@Entity('Auth')
export class AuthTypeorm implements Auth {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @OneToOne(() => UserTypeorm, ({ id }) => id, { onDelete: 'CASCADE' })
  user?: UserTypeorm;

  constructor(data: AuthTypeorm) {
    return Object.assign(this, {
      ...data,
      id: uuid.v4()
    });
  }
}
