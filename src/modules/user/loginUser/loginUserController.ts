import { Request, Response } from 'express';
import { LoginUserService } from './loginUserService';

export class LoginUserController {
  constructor(private loginUserService: LoginUserService) {}

  async hanlde(req: Request, res: Response) {
    const data = req.body;
    const loginUser = await this.loginUserService.execute(data);
    return res.status(201).json(loginUser);
  }
}
