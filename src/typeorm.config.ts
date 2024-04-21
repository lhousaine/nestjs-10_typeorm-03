import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const MysqlDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: false,
  migrationsTableName: 'migrations_test',
  migrations: ['dist/migrations/**/*.js'],
  entities: [`dist/**/*.entity.js`],
  migrationsRun: false,
  migrationsTransactionMode: 'each',
};

const MongodbDataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  name: 'mongodb',
  url: process.env.MONGODB_URL,
  username: process.env.USER_MONGO_MYDB,
  password: process.env.PASSWORD_MONGO_MYDB,
  database: 'testORM',
  synchronize: false,
  entities: [`dist/**/*.schema.js`],
};

const MysqlDataSource = new DataSource(MysqlDataSourceOptions);
const MongodbDataSource = new DataSource(MongodbDataSourceOptions);

MysqlDataSource.initialize();
MongodbDataSource.initialize();

export {
  MysqlDataSource,
  MongodbDataSource,
  MysqlDataSourceOptions,
  MongodbDataSourceOptions,
};
