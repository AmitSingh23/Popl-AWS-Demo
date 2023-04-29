
import { Router, Request, Response } from 'express';
import { Resource } from './Resource';
import { QueueService } from '../aws/QueueService';

const resourceRouter = Router()

const queueService: QueueService = new QueueService();

resourceRouter.post('/', async (req: Request, res: Response) => {
    const resource = req.body.resource as Resource

    await queueService.sendMessage(process.env.QUEUE_URL, JSON.stringify(resource));

    res.json({message: 'Message sent'});
})

export default resourceRouter;