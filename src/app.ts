import express from 'express';
import { masterRouter } from './routers/master-router';

const app = express();
const port = process.env.PORT || 5000;

app.use('/api', masterRouter);

app.listen(port, () => console.log(`> Listening on port ${port}`));

// TODO: Helmet, error handling, logging, better structure, container, async
