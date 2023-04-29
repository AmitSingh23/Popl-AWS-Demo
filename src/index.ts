import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

export const handler = serverless(app);

