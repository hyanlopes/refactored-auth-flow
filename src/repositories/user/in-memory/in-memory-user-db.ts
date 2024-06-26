import { User } from '../../../entities/user/user';
import { IUserRepository } from '../user-repository';

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(user: User): Promise<User> {
    const createdUser = new User(user);
    return createdUser;
  }

  async save(user: User): Promise<void> {
    this.items.push(user);
  }

  async verifyDuplicatesEmails(email: string): Promise<void | User> {
    return this.items.find(({ email: userEmail }) => email === userEmail);
  }

  async findByEmail(email: string): Promise<void | User> {
    return this.items.find(({ email: userEmail }) => userEmail === email);
  }
}
