import { Router } from 'express';
import { greetingRouter } from './greeting-router';

export const masterRouter = Router();

masterRouter.use('/greet', greetingRouter);
