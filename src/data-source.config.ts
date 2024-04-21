import { DataSource } from 'typeorm';
import { MysqlDataSourceOptions } from './typeorm.config';

const dataSource = new DataSource(MysqlDataSourceOptions);

export default dataSource;
