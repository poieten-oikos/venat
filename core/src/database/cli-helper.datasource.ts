import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';

// Used by the TypeORM CLI when generating migrations
const entities = path.join(__dirname, '../**/*.entity.{ts,js}');
const migrations = path.join(__dirname, 'migrations/**/*.{ts,js}');

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER ?? 'postgres',
  password: process.env.DATABASE_PASS ?? '',
  database: process.env.DATABASE_NAME ?? 'postgres',
  logging: true,
  entities: [entities],
  migrations: [migrations],
});
