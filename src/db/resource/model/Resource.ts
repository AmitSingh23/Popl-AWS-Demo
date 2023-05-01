import { Table, Column, CreatedAt, UpdatedAt, DataType, Model } from "sequelize-typescript";
import { Resource } from "../../../shared/resource/Resource";

@Table({
    timestamps: true,
    tableName: 'resources'
})
class ResourceEntity extends Model implements Resource {
    @Column(DataType.STRING(128))
    name: string;

    @Column(DataType.STRING(128))
    nickname: string;

    @Column(DataType.STRING(128))
    type: string; 

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}

export default ResourceEntity;