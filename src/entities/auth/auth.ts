import * as uuid from 'uuid';
import { User } from '../user/user';

export class Auth {
  id?: string;
  refreshToken: string;
  user?: User;

  constructor({ refreshToken, user }: Auth) {
    return Object.assign(this, {
      refreshToken,
      id: uuid.v4(),
      user
    });
  }
}
