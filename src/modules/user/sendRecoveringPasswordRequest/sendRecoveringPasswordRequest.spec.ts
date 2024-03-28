import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repositories/user/in-memory/in-memory-user-db';
import { InMemoryUserRequestRepository } from '../../../repositories/userRequest/in-memory/in-memory';
import { SendRecoveringPasswordRequestSerivce } from './sendRecoveringPasswordRequestService';
import { User } from '../../../entities/user/user.entity';

describe('Testing for send recovering password request', () => {
  it('Should create a valide request for recovering password', async () => {
    const userRepository = new InMemoryUserRepository();
    const userRequestRepository = new InMemoryUserRequestRepository(
      userRepository
    );

    const user = new User({
      email: 'user@email.com',
      name: 'User',
      password: '1234User!'
    });

    userRepository.items = [user];

    const instanceRequestRecoverPassword =
      new SendRecoveringPasswordRequestSerivce(userRequestRepository);

    const request = await instanceRequestRecoverPassword.execute(user.email);

    expect(request).toHaveProperty('id');
    expect(request).toHaveProperty('code');
    expect(request).toHaveProperty('validatedUntil');
    expect(request.authorEmail).toBeDefined();
  });

  it('Should throw error because user not found', async () => {
    const userRepository = new InMemoryUserRepository();
    const userRequestRepository = new InMemoryUserRequestRepository(
      userRepository
    );

    const instanceRequestRecoverPassword =
      new SendRecoveringPasswordRequestSerivce(userRequestRepository);

    expect(
      instanceRequestRecoverPassword.execute('not-found-email@email.com')
    ).rejects.toThrow('User not found');
  });
});
