import * as uuid from 'uuid';
import { User } from '../user/user.entity';

export class Auth {
  id?: string;

  refreshToken: string;

  user?: User;

  constructor(data: Auth) {
    return Object.assign(this, {
      ...data,
      id: uuid.v4()
    });
  }
}
