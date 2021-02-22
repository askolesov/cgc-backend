import { Router } from 'express';
import GreetingRouter from './greeting-router';

class MasterRouter {
  private router = Router();

  private greetingRouter = GreetingRouter;

  get getRouter(): Router {
    return this.router;
  }

  constructor() {
    this.configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private configure() {
    this.router.use('/greet', this.greetingRouter);
  }
}

export { MasterRouter as default };
