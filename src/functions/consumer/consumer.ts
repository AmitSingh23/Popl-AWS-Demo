import { SQSEvent } from 'aws-lambda';
import Resource from '../../db/resource/model/Resource';
import resourceRepository from '../../db/resource/repository/ResourceRepository';
import { OpenSearchService } from '../../shared/aws/OpenSearchService';
import ResourceEntity from '../../db/resource/model/Resource';

const openSearchService: OpenSearchService = new OpenSearchService();

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body) as Resource;

    let resource: ResourceEntity;
    try {
      // todo: do some validatino to verify that field is of the right type
      resource = await resourceRepository.create({name: body.name, nickname: body.nickname, type: body.type});
      await resource.save();
    } catch (error: any) {
      console.error('An error ocurred while creating the new Resource object', error);

      return;
    }


    // todo: realistically the above method should post a message to another queue which this method would be based off of
    // that would allow failures to retry writing to OS without rewriting to the database
    try {
      await openSearchService.writeDocument(resource);
    } catch(error: any) {
      console.error('An error occurred while indexing the Resource object into OpenSearch');
    }

    console.log('Received message: ', body);
  }
};