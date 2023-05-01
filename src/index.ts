import express from 'express';
import serverless from 'serverless-http';

import resourceRouter from './resource/resource.router';

const app = express();

app.use(express.json());

app.get('/', (req: any, res: any) => {
  console.log('this shoudlnt happen');
  res.json({ message: 'Hello, world!' });
});

app.use('/resource', resourceRouter);

export const handler = serverless(app);

