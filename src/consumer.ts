import { SQSEvent } from 'aws-lambda';
import { Resource } from './resource/Resource';
import ResourceEntity from './db/model/Resource';

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as Resource;

    console.log('Received message: ', body);

  }
};