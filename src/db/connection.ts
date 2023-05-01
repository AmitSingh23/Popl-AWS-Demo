
import { Sequelize } from "sequelize-typescript";
import ResourceEntity from "./resource/model/Resource";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    repositoryMode: true,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000,
    },
    models: [ResourceEntity]

});

export default sequelize;