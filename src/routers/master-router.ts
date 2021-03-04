import { Router } from 'express';
import { greetingRouter } from './greeting-router';
import { firestoreRouter } from './firestore-router';

export const masterRouter = Router();

masterRouter.use('/greet', greetingRouter);
masterRouter.use('/firestore', firestoreRouter);
