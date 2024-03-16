import { Auth } from '../../entities/auth/auth.entity';
import { User } from '../../entities/user/user.entity';

export interface UpdateOrCreateInput {
  newRefreshToken: string;
  user: User;
}

export interface IAuthRepository {
  create(auth: Auth): Promise<Auth>;
  save(auth: Auth): Promise<void>;
  updateOrCreate(data: UpdateOrCreateInput): Promise<void>;
}
