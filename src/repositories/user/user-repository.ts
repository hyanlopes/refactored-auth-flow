import { User } from '../../entities/user/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  save(user: User): Promise<void>;
  verifyDuplicatesEmails(email: string): Promise<User | void>;
  findByEmail(email: string): Promise<User | void>;
}
