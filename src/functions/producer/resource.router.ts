
import express, { Router, Request, Response } from 'express';
import { QueueService } from '../../shared/aws/QueueService';

const resourceRouter = Router()

const queueService: QueueService = new QueueService();

resourceRouter.use(express.json());
resourceRouter.post('/', async (req: Request, res: Response) => {
    const resource = req.body.resource

    let result = await queueService.sendMessage(process.env.QUEUE_URL, JSON.stringify(resource));

    if (result == null) {
        res.statusCode = 500;
        res.json({'message': 'Unable to send message to queue, an error occurred'});
        return;
    }

    res.send({'message': 'Message successfully added to queue'});
})

export default resourceRouter;