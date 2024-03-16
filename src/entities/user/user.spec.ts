import { describe, it, expect } from 'vitest';
import { User } from './user.entity';

describe('User entity', () => {
  it('Should create a user instance of User entity', () => {
    const user = new User({
      email: 'test@email.com',
      name: 'Test',
      password: 'test123!'
    });

    expect(user).toBeInstanceOf(User);
  });
});
