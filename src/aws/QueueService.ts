import AWS, { SQS }  from 'aws-sdk';

export class QueueService {
  private sqs: SQS;

  constructor(sqs?: SQS) {
    if (sqs) {
      this.sqs = sqs;
    } else {
      this.sqs = new SQS({ region: 'us-east-1' });      
    }
  }

  async sendMessage(queueUrl: string, messageBody: string) {
    const params = {
      MessageBody: messageBody,
      QueueUrl: queueUrl,
    };
  
    let result = null;
    try {
      result = await this.sqs.sendMessage(params).promise();
      console.log(`Message sent to ${queueUrl} with ID ${result.MessageId}`);
    } catch (error) {
      console.error(`Error sending message to ${queueUrl}: ${error}`);
    }

    return result;
  };
  
}