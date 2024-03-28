import { User } from '../../entities/user/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  save(user: User): Promise<void>;
  verifyDuplicatesEmails(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | void>;
  findById(id: string): Promise<User | void>;
}
