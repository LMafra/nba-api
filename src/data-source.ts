import 'dotenv/config';
import 'reflect-metadata';
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";



const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,

   entities: [`${__dirname}/**/database/entities/*.{ts,js}`],
   migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`]
})
