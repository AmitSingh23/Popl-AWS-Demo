import sequelize from "../../connection";
import ResourceEntity from "../model/Resource";

const resourceRepository = sequelize.getRepository(ResourceEntity);
sequelize.sync();

export default resourceRepository;