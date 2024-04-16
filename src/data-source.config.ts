import { DataSource } from "typeorm";
import { MysqlDataSourceOptions } from "./typeorm.config";

const dataSource = new DataSource(MysqlDataSourceOptions);
dataSource.initialize();

export default dataSource;
