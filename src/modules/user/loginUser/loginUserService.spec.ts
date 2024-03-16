import { describe, expect, it } from 'vitest';
import { InMemoryAuthRepository } from '../../../repositories/auth/in-memory/in-memory-auth';
import { InMemoryUserRepository } from '../../../repositories/user/in-memory/in-memory-user-db';
import { LoginUserService } from './loginUserService';
import { JwtUtils } from '../../../utils/jwtUtil';
import { CreateUserService } from '../createUser/createUserService';

describe('Testing user login cases', () => {
  it('Should return a valid session', async () => {
    const authRepository = new InMemoryAuthRepository();
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserService(userRepository);

    const userServices = new LoginUserService(
      userRepository,
      authRepository,
      new JwtUtils()
    );

    const user = await createUser.execute({
      email: 'hyan',
      name: 'hyan',
      password: '1234'
    });

    expect(
      userServices.execute({
        email: user.email,
        password: user.password
      })
    ).resolves.toHaveProperty('token');
  });

  it('Should return a error with wrong password', async () => {
    const authRepository = new InMemoryAuthRepository();
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUserService(userRepository);

    const userServices = new LoginUserService(
      userRepository,
      authRepository,
      new JwtUtils()
    );

    const user = await createUser.execute({
      email: 'hyan',
      name: 'hyan',
      password: '1234'
    });

    expect(
      userServices.execute({
        email: user.email,
        password: '12'
      })
    ).rejects.toThrow();
  });
});
