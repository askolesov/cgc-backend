import express from 'express';
import { masterRouter } from './routers/master-router';
import { configService } from "./services/config-service";

const app = express();

app.use('/api', masterRouter);

app.listen(configService.app.port, () => console.log(`> Listening on port ${configService.app.port}`));

// TODO: Helmet, error handling, logging, better structure, container, async
