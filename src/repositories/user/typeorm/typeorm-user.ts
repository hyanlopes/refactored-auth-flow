import { AppDataSource } from '../../../config/typeorm/data-source';
import { UserTypeorm } from '../../../config/typeorm/entities/user';

import { PasswordUtility } from '../../../utils/passwordUtil';
import { IUserRepository } from '../user-repository';

export class TypeormUserRepository implements IUserRepository {
  private userRepository = AppDataSource.getRepository(UserTypeorm);

  async create(user: UserTypeorm): Promise<UserTypeorm> {
    const encryptedPassword = await PasswordUtility.encryptPassword(
      user.password
    );

    const createUser = this.userRepository.create({
      ...user,
      password: encryptedPassword
    });

    return createUser;
  }

  async save(user: UserTypeorm): Promise<void> {
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<void | UserTypeorm> {
    const user = await this.userRepository.findOneBy({
      email
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
}
