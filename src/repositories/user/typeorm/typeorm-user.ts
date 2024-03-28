import { AppDataSource } from '../../../config/typeorm/data-source';
import { UserTypeorm } from '../../../config/typeorm/entities/user';
import { User } from '../../../entities/user/user.entity';

import { IUserRepository } from '../user-repository';

export class TypeormUserRepository implements IUserRepository {
  private userRepository = AppDataSource.getRepository(UserTypeorm);

  async create(user: UserTypeorm): Promise<UserTypeorm> {
    const createUser = this.userRepository.create(user);

    return createUser;
  }

  async save(user: UserTypeorm): Promise<void> {
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<void | UserTypeorm> {
    const user = await this.userRepository.findOne({
      where: {
        email
      },
      relations: {
        auth: true
      }
    });

    if (!user) {
      return;
    }

    return user;
  }

  async verifyDuplicatesEmails(email: string): Promise<boolean> {
    const user = await this.userRepository.exists({
      where: {
        email
      }
    });
    return user;
  }

  async findById(id: string): Promise<void | User> {
    const user = await this.userRepository.findOneBy({
      id
    });

    if (!user) {
      return;
    }

    return user;
  }
}
