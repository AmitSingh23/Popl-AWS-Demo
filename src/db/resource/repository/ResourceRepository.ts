import sequelize from "../../connection";
import ResourceEntity from "../model/Resource";

const resourceRepository = sequelize.getRepository(ResourceEntity);

sequelize.sync()
    .then(() => {
        console.log('Successfully sync\'d sequelize instance')
    })
    .catch((error) => {
        console.error('Could not sync sequelize instance', error);
    });

export default resourceRepository;