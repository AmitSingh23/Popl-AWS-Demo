import { SQSEvent } from 'aws-lambda';
import Resource from '../../db/resource/model/Resource';
import resourceRepository from '../../db/resource/repository/ResourceRepository';

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as Resource;

    try {
      // todo: do some validatino to verify that field is of the right type
      const resource = await resourceRepository.create({name: body.name, nickname: body.nickname, type: body.type});
      await resource.save();
    } catch (error: any) {
      console.error('An error ocurred while creating the new Resource object', error);

      return;
    }

    console.log('Received message: ', body);
  }
};