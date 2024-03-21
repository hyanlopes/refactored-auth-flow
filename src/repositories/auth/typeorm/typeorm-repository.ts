import { IAuthRepository, UpdateOrCreateInput } from '../auth-repository';

import { AppDataSource } from '../../../config/typeorm/data-source';
import { AuthTypeorm } from '../../../config/typeorm/entities/auth';

export class TypeormAuthRepository implements IAuthRepository {
  private authRepository = AppDataSource.getRepository(AuthTypeorm);

  async create(auth: AuthTypeorm): Promise<AuthTypeorm> {
    if (!auth.user) {
      throw new Error('User is required');
    }

    const createAuth = this.authRepository.create(auth);

    return createAuth;
  }

  async save(auth: AuthTypeorm): Promise<void> {
    await this.authRepository.save(auth);
  }

  async updateOrCreate(data: UpdateOrCreateInput): Promise<void> {
    const auth = await this.authRepository.findOne({
      where: {
        user: {
          id: data.user.id
        }
      },
      relations: {
        user: true
      }
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
