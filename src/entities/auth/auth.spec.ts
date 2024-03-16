import { describe, it, expect } from 'vitest';
import { Auth } from './auth.entity';

describe('Auth entity', () => {
  it('Should create a valid Auth', () => {
    const auth = new Auth({
      refreshToken: 'teste refresh token'
    });

    expect(auth).toHaveProperty('refreshToken');
  });
});
