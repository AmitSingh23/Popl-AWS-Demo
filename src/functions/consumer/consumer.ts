import { SQSEvent } from 'aws-lambda';
import Resource from '../../db/resource/model/Resource';
import resourceRepository from '../../db/resource/repository/ResourceRepository';

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as Resource;

    const resource = await resourceRepository.create({name: body.name || 'Jimothy', nickname: body.nickname, type: body.type})

    await resource.save();

    console.log('Received message: ', body);
  }
};