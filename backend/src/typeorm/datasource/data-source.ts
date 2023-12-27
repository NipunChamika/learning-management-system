import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'N1pun$',
  database: 'lms_db',
  entities: [User],
  migrations: ['src/typeorm/migrations/*.ts'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
