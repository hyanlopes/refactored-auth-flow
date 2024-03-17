import { Request, Response } from 'express';
import { CreateUserService } from './createUserService';

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const data = req.body;
    const userCreate = await this.createUserService.execute(data);
    return res.status(201).json(userCreate);
  }
}
