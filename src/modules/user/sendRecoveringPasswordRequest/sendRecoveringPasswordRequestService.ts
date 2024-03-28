import { IUserRequestRepository } from '../../../repositories/userRequest/userRequest-repository';
import { DateUtility } from '../../../utils/dateUtility';

export class SendRecoveringPasswordRequestSerivce {
  constructor(private userRequestRepository: IUserRequestRepository) {}

  async execute(userEmail: string) {
    const request = await this.userRequestRepository.create({
      authorEmail: userEmail,
      description: 'Request to change password',
      status: 'PENDING',
      validatedUntil: DateUtility.getTomorrow()
    });

    await this.userRequestRepository.save(request);

    return request;
  }
}
