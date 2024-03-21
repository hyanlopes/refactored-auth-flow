import * as uuid from 'uuid';
import { Auth } from '../auth/auth.entity';

export class User {
  id?: string;

  name: string;

  password: string;

  email: string;

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
