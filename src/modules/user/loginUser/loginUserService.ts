import { IAuthRepository } from '../../../repositories/auth/auth-repository';
import { IUserRepository } from '../../../repositories/user/user-repository';
import { JwtUtils } from '../../../utils/jwtUtil';

interface ILoginRequest {
  email: string;
  password: string;
}
interface ILoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export class LoginUserService {
  constructor(
    private userRepository: IUserRepository,
    private authRepository: IAuthRepository,
    private tokenUtility: JwtUtils
  ) {}

  async execute({ email, password }: ILoginRequest): Promise<ILoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Wrong email or password');
    }

    if (user.password !== password) {
      throw new Error('Wrong email or password');
    }

    const token = this.tokenUtility.creatingToken(
      { userId: user.id },
      'asdasd',
      '1h'
    );
    const refreshToken = this.tokenUtility.creatingToken(
      { userId: user.id },
      'asd123as'
    );

    await this.authRepository.updateOrCreate({
      newRefreshToken: refreshToken,
      user
    });

    return {
      expiresIn: 60 * 60,
      refreshToken,
      token
    };
  }
}
