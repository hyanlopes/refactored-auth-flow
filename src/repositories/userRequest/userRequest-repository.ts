import { UserRequests } from '../../entities/userRequests/userRequests.entity';

export interface IUserRequestRepository {
  create(
    data: Required<
      Pick<
        UserRequests,
        'authorEmail' | 'description' | 'status' | 'validatedUntil'
      >
    >
  ): Promise<UserRequests>;
  save(data: UserRequests): Promise<void>;
}
