import { IUserRepository } from '../../../repositories/user/user-repository';

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
      throw new Error('A user with this email already exists');
    }

    const user = await this.userRepository.create({
      email,
      name,
      password
    });

    await this.userRepository.save(user);

    return user;
  }
}
