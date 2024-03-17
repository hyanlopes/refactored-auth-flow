import { Router } from 'express';
import { createUserFactory } from '../modules/user/createUser/createUserFactory';

const routes = Router();

export const userRoutes = () => {
  routes.post('/create-user', (req, res) =>
    createUserFactory().handle(req, res)
  );
  return routes;
};
