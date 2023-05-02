import express from 'express';
import serverless from 'serverless-http';

import resourceRouter from './resource.router';

const app = express();

app.use(express.json());

app.use('/resource', resourceRouter);

export const handler = serverless(app);

