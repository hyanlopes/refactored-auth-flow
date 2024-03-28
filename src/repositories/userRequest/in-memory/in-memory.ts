import { UserRequests } from '../../../entities/userRequests/userRequests.entity';
import { InMemoryUserRepository } from '../../user/in-memory/in-memory-user-db';

import { IUserRequestRepository } from '../userRequest-repository';

export class InMemoryUserRequestRepository implements IUserRequestRepository {
  constructor(private userRepository: InMemoryUserRepository) {}
  public items: UserRequests[] = [];

  async create(
    data: Required<
      Pick<
        UserRequests,
        'authorEmail' | 'description' | 'status' | 'validatedUntil'
      >
    >
  ): Promise<UserRequests> {
    const user = await this.userRepository.findByEmail(data.authorEmail);

    if (!user) {
      throw Error('User not found');
    }

    const newUserRequest: UserRequests = new UserRequests(data, user);

    return newUserRequest;
  }

  async save(data: UserRequests): Promise<void> {
    this.items.push(data);
  }
}
