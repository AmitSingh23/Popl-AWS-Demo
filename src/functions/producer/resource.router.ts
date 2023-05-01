
import express, { Router, Request, Response } from 'express';
import { QueueService } from '../../shared/aws/QueueService';

const resourceRouter = Router()

const queueService: QueueService = new QueueService();

resourceRouter.use(express.json());
resourceRouter.post('/', async (req: Request, res: Response) => {
    const resource = req.body.resource

    let result = await queueService.sendMessage(process.env.QUEUE_URL, JSON.stringify(resource));

    // todo: this is a bad return object
    res.send(result);
})

export default resourceRouter;