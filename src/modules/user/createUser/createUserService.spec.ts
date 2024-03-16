import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../repositories/user/in-memory/in-memory-user-db';
import { CreateUserService } from './createUserService';
import { User } from '../../../entities/user/user.entity';

describe('Testing a creation of user', () => {
  it('Should be possible to create a new user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserService(userRepository);

    expect(
      createUser.execute({
        email: 'hyan@email.com',
        name: 'Hyan',
        password: '123!'
      })
    ).resolves.toBeInstanceOf(User);
  });

  it('Should not be possible to create a user with repeted email', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = new User({
      email: 'hyan@email.com',
      name: 'Hyan',
      password: '123Lopes'
    });

    await createUser.execute(user);

    expect(createUser.execute(user)).rejects.toThrowError();
  });
});
