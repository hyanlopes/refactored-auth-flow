import * as uuid from 'uuid';
import { User } from '../user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @OneToOne(() => User, ({ id }) => id, { onDelete: 'CASCADE' })
  user?: User;

  constructor(data: Auth) {
    return Object.assign(this, {
      ...data,
      id: uuid.v4()
    });
  }
}
