import { describe, it, expect } from 'vitest';
import { UserRequests } from './userRequests.entity';
import { User } from '../user/user.entity';

describe('User Requests entity', () => {
  it('Should create a request with createdAt and updatedAt field', () => {
    const user = new User({
      email: 'hyan@email.com',
      name: 'Hyan',
      password: '12345678'
    });

    const request = new UserRequests(
      {
        description: 'Request test',
        status: 'PENDING'
      },
      user
    );

    expect(request).toHaveProperty('createdAt');
    expect(request).toHaveProperty('updatedAt');
  });
});
