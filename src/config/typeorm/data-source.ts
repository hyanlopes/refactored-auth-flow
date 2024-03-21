import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: +process.env.MYSQLDB_PORT!,
  username: 'root',
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/config/typeorm/entities/*.ts'],
  migrations: ['src/config/typeorm/migrations/*.ts']
});

AppDataSource.initialize().catch(err =>
  console.error('Error during Data Source initialization', err)
);

export { AppDataSource };
