import { Request, Response, Router } from 'express';
import GreetingController from '../controllers/greeting-controller';

class GreetingRouter {
  private router = Router();

  private controller = GreetingController;

  get get_router() {
    return this.router;
  }

  constructor() {
    this.configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private configure() {
    this.router.get('/', (request: Request, response: Response) => {
      response.status(200).json(this.controller.defaultMethod());
    });
  }
}

export = new GreetingRouter().get_router;
