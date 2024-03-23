import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

import { appRoutes } from './routes';
import { AppError } from './config/errors';
import { UserRequests } from './entities/userRequests/userRequests.entity';
import { User } from './entities/user/user.entity';

const app = express();
const port = 3000;

app.use(express.json());

appRoutes(app);
app.use(AppError.errorHandle);

app.get('/', (_, res) => {
  res.send('Hello world');
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
