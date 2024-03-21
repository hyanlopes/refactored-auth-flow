import { IAuthRepository } from '../../../repositories/auth/auth-repository';
import { TypeormAuthRepository } from '../../../repositories/auth/typeorm/typeorm-repository';
import { TypeormUserRepository } from '../../../repositories/user/typeorm/typeorm-user';
import { IUserRepository } from '../../../repositories/user/user-repository';
import { JwtUtils } from '../../../utils/jwtUtil';
import { LoginUserController } from './loginUserController';
import { LoginUserService } from './loginUserService';

export const loginUserFactory = () => {
  const userRepository = new TypeormUserRepository();
  const authRepository = new TypeormAuthRepository();

  const loginUserSerive = new LoginUserService(
    userRepository,
    authRepository,
    new JwtUtils()
  );

  const loginUserController = new LoginUserController(loginUserSerive);

  return loginUserController;
};
