import express from 'express';
import serverless from 'serverless-http';
import resourceRepository from '../../db/resource/repository/ResourceRepository';

const app = express();

app.use(express.json());

app.get('/resource/:id', async (req: any, res: any) => {
    const id = +req.params.id;

    let result;
    try {
        result = await resourceRepository.findByPk(id);
    } catch (error: any) {
        res.statusCode = 500;
        console.error('Could not retrieve resource by id, an error ocurred', error);
        res.json({'message': 'Could not retrieve resource by id, an error ocurred'});
        return;
    }
        
    if (!result) {
        res.statusCode = 404;
        res.json({'message': 'No resource with that id exists'})
        return;
    }

    res.send(result)
});

app.get('/resource/', async (req: any, res: any) => {
    let result;

    try {
        result = await resourceRepository.findAll();
    } catch(error: any) {
        res.statusCode = 500;
        console.error('Could not retrieve all resources, an error occurred', error);
        res.json({'message': 'Could not retrieve all resources, an error ocurred'});
        return;
    }

    res.send(result);
});

export const handler = serverless(app);