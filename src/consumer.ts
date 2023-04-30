import { SQSEvent } from 'aws-lambda';
import ResourceEntity from './db/resource/model/Resource';
import Resource from './db/resource/model/Resource';
import sequelize from './db/connection';

sequelize.addModels([ResourceEntity]);
ResourceEntity.sync();

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as Resource;

    const resource = await ResourceEntity.create({body})

    await resource.save();

    console.log('Received message: ', body);
  }
};