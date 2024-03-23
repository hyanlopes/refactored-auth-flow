import { User } from '../user/user.entity';
import * as uuid from 'uuid';

export type RequestStatus = 'PENDING' | 'RESOLVED' | 'CANCELED';

export class UserRequests {
  id?: string;

  status: RequestStatus = 'PENDING';

  authorId?: string;

  description: string;

  readonly createdAt: Date;

  updatedAt: Date;

  constructor({ description, status }: Partial<UserRequests>, user: User) {
    return Object.assign({
      description,
      status,
      id: uuid.v4(),
      authorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
