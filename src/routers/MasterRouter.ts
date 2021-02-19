import { Router } from 'express';
import GreetingRouter from './GreetingRouter';

export class MasterRouter {
  private _router = Router();
  private _greetingRouter = GreetingRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/greet', this._greetingRouter);
  }
}
