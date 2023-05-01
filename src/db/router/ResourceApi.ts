import express from 'express';
import serverless from 'serverless-http';
import resourceRepository from '../resource/repository/ResourceRepository';

const app = express();

app.use(express.json());

app.get('/resource/:id', async (req: any, res: any) => {
    const id = +req.params.id;

    const result = await resourceRepository.findByPk(id);

    res.send(result)
});

app.get('/resource/', async (req: any, res: any) => {
    const result = await resourceRepository.findAll();
    
    res.send(result);
});

export const handler = serverless(app);