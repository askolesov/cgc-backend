import { Request, Response, Router } from 'express';
import { greetingService } from '../services/greeting-service';

export const greetingRouter = Router();

greetingRouter.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        greeting: greetingService.sayHello('world'),
    });
});
