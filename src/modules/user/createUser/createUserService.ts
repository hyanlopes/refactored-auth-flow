import { plainToClass } from 'class-transformer';
import { IUserRepository } from '../../../repositories/user/user-repository';
import { User } from '../../../entities/user/user.entity';
import { AppError } from '../../../config/errors';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, name, password }: IUserRequest) {
    const hasUserWithEmail = await this.userRepository.verifyDuplicatesEmails(
      email
    );

    if (hasUserWithEmail) {
      throw new AppError(407, 'A user with this email already exists');
    }

    const user = await this.userRepository.create({
      email,
      name,
      password
    });

    await this.userRepository.save(user);

    return plainToClass(User, user);
  }
}
