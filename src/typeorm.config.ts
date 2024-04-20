import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

const MysqlDataSourceOptions: MysqlConnectionOptions = {
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

const MongodbDataSourceOptions: MongoConnectionOptions = {
  type: 'mongodb',
  name: 'mongodb',
  url: process.env.MONGODB_URL,
  username: process.env.USER_MONGO_MYDB,
  password: process.env.PASSWORD_MONGO_MYDB,
  database: 'testORM',
  synchronize: true,
  useUnifiedTopology: true,
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
