import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

export const sequelize = new Sequelize({
    database: process.env.PG_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    dialect: 'postgres',
    host: process.env.PG_HOST,
    logging: false,
    modelPaths: [path.join(__dirname, '../model')],
    modelMatch: doModelsMatch,
    pool: {
        acquire: 30000,
        idle: 10000,
        max: 5,
        min: 0,
    },
});

function doModelsMatch(filename: string, member: string) {
  return filename === member.toLowerCase();
}
