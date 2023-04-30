
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 2,
        min: 0,
        idle: 0,
        acquire: 3000,
        evict: 30000
      }
});

export default sequelize;