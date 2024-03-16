import * as uuid from 'uuid';
import { Auth } from '../auth/auth';

export class User {
  id?: string;
  name: string;
  password: string;
  email: string;
  auth?: Auth;

  constructor({ email, name, password }: User) {
    return Object.assign(this, {
      name,
      password,
      email,
      id: uuid.v4()
    });
  }

  static create({ email, name, password }: User) {
    const user = new User({
      email,
      name,
      password,
      id: uuid.v4()
    });
    return user;
  }
}
