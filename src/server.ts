import 'reflect-metadata';

import express from 'express';
import { InitializeDataSource } from './config/typeorm/data-source';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello world');
});

(async () => {
  await InitializeDataSource();
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
})();
