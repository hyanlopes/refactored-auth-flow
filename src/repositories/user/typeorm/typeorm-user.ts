import { AppDataSource } from '../../../config/typeorm/data-source';
import { User } from '../../../entities/user/user.entity';
import { PasswordUtility } from '../../../utils/passwordUtil';
import { IUserRepository } from '../user-repository';

export class TypeormUserRepository implements IUserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async create(user: User): Promise<User> {
    const encryptedPassword = await PasswordUtility.encryptPassword(
      user.password
    );

    const createUser = this.userRepository.create({
      ...user,
      password: encryptedPassword
    });

    return createUser;
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<void | User> {
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
