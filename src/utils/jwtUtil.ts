import * as jwt from 'jsonwebtoken';

export class JwtUtils {
  creatingToken(
    sub: object,
    secretKey: string,
    expiresIn: number | string = '7d'
  ) {
    const token = jwt.sign(sub, secretKey, {
      expiresIn
    });
    return token;
  }
}
