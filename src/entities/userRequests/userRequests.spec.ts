import { describe, it, expect } from 'vitest';
import { UserRequests } from './userRequests.entity';
import { User } from '../user/user.entity';

describe('User Requests entity', () => {
  it('Should create a request with createdAt, updatedAt and code field', () => {
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
    expect(request).toHaveProperty('code');
  });

  it('Should not throw error when creating a new user request with a validated date', () => {
    const user = new User({
      email: 'hyan@email.com',
      name: 'Hyan',
      password: '12345678'
    });

    const dateInFuture = new Date();
    dateInFuture.setDate(dateInFuture.getDate() + 1); // Set to tomorrow

    expect(() => {
      new UserRequests(
        {
          description: 'Request test',
          status: 'PENDING',
          validatedUntil: dateInFuture
        },
        user
      );
    }).not.toThrow();
  });

  it('Should throw error when creating a new user request with invalid validated date', () => {
    const user = new User({
      email: 'hyan@email.com',
      name: 'Hyan',
      password: '12345678'
    });

    const dateInPast = new Date();
    dateInPast.setDate(dateInPast.getDate() - 1); // Set to yesterday

    expect(() => {
      new UserRequests(
        {
          description: 'Request test',
          status: 'PENDING',
          validatedUntil: dateInPast
        },
        user
      );
    }).toThrowError(
      'Validated until field must be bigger than createdAt (today)'
    );
  });
});
