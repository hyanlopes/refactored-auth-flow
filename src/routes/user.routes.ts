import { Router } from 'express';
import { createUserFactory } from '../modules/user/createUser/createUserFactory';
import { loginUserFactory } from '../modules/user/loginUser/loginUserFactory';

const routes = Router();

export const userRoutes = () => {
  routes.post('/create-user', (req, res) =>
    createUserFactory().handle(req, res)
  );
  routes.post('/login', (req, res) => loginUserFactory().hanlde(req, res));
  return routes;
};
