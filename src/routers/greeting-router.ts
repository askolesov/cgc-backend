import { Request, Response, Router } from 'express';
import { greetingService } from '../services/greeting-service';

export const greetingRouter = Router();

greetingRouter.get('/', (request: Request, response: Response) => {
    const name = (request.query.name as string) || 'world';
    const message = greetingService.sayHello(name);

    response.status(200).json({
        greeting: message,
    });
});
