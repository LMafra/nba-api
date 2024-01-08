import 'dotenv/config';
import 'reflect-metadata';
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";



const port = process.env.POSTGRESDB_LOCAL_PORT as unknown as number;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.POSTGRESDB_HOST,
   port: port,
   username: process.env.POSTGRESDB_USER,
   password: process.env.POSTGRESDB_ROOT_PASSWORD,
   database: process.env.POSTGRESDB_DATABASE,
   synchronize: true,

   entities: [`${__dirname}/**/database/entities/*.{ts,js}`],
   migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`]
})
