import { Table, Column, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, DataType, Model } from "sequelize-typescript";
import { Resource } from "../../resource/Resource";
import sequelize from "../connection";

@Table({
    timestamps: true,
    tableName: 'resources'
})
class ResourceEntity extends Model implements Resource {
    @Column
    name: string;

    @Column
    nickname: string;

    @Column
    type: string; 

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}

export default ResourceEntity;

// Might need to use this-- idk, we'll find out
// import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
// import sequelize from '../connection';

// class Resource extends Model<InferAttributes<Resource>, InferCreationAttributes<Resource>> {
//   declare id: CreationOp(tional<number>;
//   declare name: string;
//   declare nickname: string;
//   declare type: string;

//   declare createdAt: CreationOptional<Date>;
//   declare updatedAt: CreationOptional<Date>;
// }

// Resource.init({
//     id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING(128),
//         allowNull: false
//     },
//     nickname: {
//         type: new DataTypes.STRING(128),
//         allowNull: false
//     },
//     type: {
//         type: new DataTypes.STRING(128),
//         allowNull: true
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
// },
// {
//     tableName: 'users',
//     sequelize
// });