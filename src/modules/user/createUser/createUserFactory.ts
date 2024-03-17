import { TypeormUserRepository } from '../../../repositories/user/typeorm/typeorm-user';
import { CreateUserController } from './createUserController';
import { CreateUserService } from './createUserService';

export const createUserFactory = () => {
  const userRepository = new TypeormUserRepository();
  const createUserService = new CreateUserService(userRepository);

  const createUserController = new CreateUserController(createUserService);
  return createUserController;
};
