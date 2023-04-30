
import { Sequelize } from "sequelize-typescript";
import ResourceEntity from "./model/Resource";

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: '', 
    port: 3306,
    dialect: 'mysql'
});

sequelize.addModels([ResourceEntity])
sequelize.sync().then(() => {
    console.log('Resource table created successfully');
}).catch((error) => {
    console.error('Error creating User table', error);
});

export default sequelize;