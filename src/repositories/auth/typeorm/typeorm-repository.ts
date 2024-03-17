import { IAuthRepository, UpdateOrCreateInput } from '../auth-repository';
import { Auth } from '../../../entities/auth/auth.entity';
import { AppDataSource } from '../../../config/typeorm/data-source';

export class TypeormAuthRepository implements IAuthRepository {
  private authRepository = AppDataSource.getRepository(Auth);

  async create(auth: Auth): Promise<Auth> {
    if (!auth.user) {
      throw new Error('User is required');
    }

    const createAuth = this.authRepository.create(auth);

    return createAuth;
  }

  async save(auth: Auth): Promise<void> {
    await this.authRepository.save(auth);
  }

  async updateOrCreate(data: UpdateOrCreateInput): Promise<void> {
    const auth = await this.authRepository.findOneBy({
      user: data.user
    });

    if (!auth) {
      const newAuth = await this.create({
        refreshToken: data.newRefreshToken,
        user: data.user
      });

      await this.save(newAuth);
      return;
    }

    auth.refreshToken = data.newRefreshToken;

    await this.save(auth);
  }
}
