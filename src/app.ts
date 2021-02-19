import dotenv from 'dotenv';
import express, { Router } from 'express';
import { MasterRouter } from './routers/MasterRouter';

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = new MasterRouter().router;
}

// initialize server app
const server = new Server();
server.app.use('/api', server.router);

// make server listen on some port
((port = process.env.PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
