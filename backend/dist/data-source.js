"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const port = process.env.POSTGRESDB_LOCAL_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRESDB_HOST,
    port: port,
    username: process.env.POSTGRESDB_USER,
    password: process.env.POSTGRESDB_ROOT_PASSWORD,
    database: process.env.POSTGRESDB_DATABASE,
    synchronize: true,
    entities: [`${__dirname}/**/database/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`]
});
