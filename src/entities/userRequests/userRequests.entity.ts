import { DateUtility } from '../../utils/dateUtility';
import { generateRandomCode } from '../../utils/generateRandomCode';
import { User } from '../user/user.entity';
import * as uuid from 'uuid';

export type RequestStatus = 'PENDING' | 'RESOLVED' | 'CANCELED';

export class UserRequests {
  id?: string;

  code: number;

  status: RequestStatus = 'PENDING';

  authorEmail?: string;

  description: string;

  validatedUntil: Date;

  readonly createdAt: Date;

  updatedAt: Date;

  constructor(
    {
      description,
      status,
      validatedUntil = DateUtility.getTomorrow()
    }: Partial<UserRequests>,
    user: User
  ) {
    if (validatedUntil < new Date()) {
      throw Error(
        'Validated until field must be bigger than createdAt (today)'
      );
    }
    return Object.assign({
      description,
      status,
      id: uuid.v4(),
      authorEmail: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      code: generateRandomCode(),
      validatedUntil
    });
  }
}
