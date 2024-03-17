import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import { InitializeDataSource } from './config/typeorm/data-source';
import { appRoutes } from './routes';
import { AppError } from './config/errors';

const app = express();
const port = 3000;

app.use(express.json());

appRoutes(app);
app.use(AppError.errorHandle);

app.get('/', (_, res) => {
  res.send('Hello world');
});

(async () => {
  await InitializeDataSource();
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
})();
