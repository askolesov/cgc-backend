import { Request, Response, Router } from 'express';
import ash from 'express-async-handler';
import { firestoreService } from '../services/firestore-service';

export const firestoreRouter = Router();

firestoreRouter.get(
    '/set',
    ash(async (request: Request, response: Response) => {
        const value = request.query.value as string;
        await firestoreService.setTestValue(value);

        response.status(200).json({
            value,
        });
    }),
);

firestoreRouter.get(
    '/get',
    ash(async (request: Request, response: Response) => {
        const value = await firestoreService.getTestValue();

        response.status(200).json({
            value,
        });
    }),
);
