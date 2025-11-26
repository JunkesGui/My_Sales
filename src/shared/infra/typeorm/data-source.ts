require('dotenv/config')
require('reflect-metadata')
import { DataSource } from "node_modules/typeorm/index";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/database/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts']
})
