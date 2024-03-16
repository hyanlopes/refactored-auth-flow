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
  entities: ['src/entities/**/*.entity.ts'],
  migrations: ['src/repositories/typeorm/migrations/*.ts']
});

const InitializeDataSource = async () =>
  await AppDataSource.initialize().catch(err =>
    console.error('Error during Data Source initialization', err)
  );

export { AppDataSource, InitializeDataSource };
