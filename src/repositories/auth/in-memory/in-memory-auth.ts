import { IAuthRepository, UpdateOrCreateInput } from '../auth-repository';
import { Auth } from '../../../entities/auth/auth.entity';

export class InMemoryAuthRepository implements IAuthRepository {
  public items: Auth[] = [];

  async create(auth: Auth): Promise<Auth> {
    const createdAuth = new Auth(auth);

    return createdAuth;
  }

  async save(auth: Auth): Promise<void> {
    this.items.push(auth);
  }

  async updateOrCreate({
    user: { id, ...rest },
    newRefreshToken
  }: UpdateOrCreateInput): Promise<void> {
    const findAuth = this.items.find(({ user }) => user && user.id === id);

    if (!findAuth) {
      this.items.push({
        refreshToken: newRefreshToken,
        user: {
          id,
          ...rest
        }
      });
      return;
    }

    findAuth.refreshToken = newRefreshToken;
  }
}
