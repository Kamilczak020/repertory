import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false,
    modelPaths: [path.join(__dirname, '../models')],
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

export default sequelize;
