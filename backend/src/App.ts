import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import authRouter from './router/authRouter';

// Creates and configures an ExpressJS web server.
class HttpApp {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cookieParser());
    this.express.use(cors({ exposedHeaders: 'Set-Cookie', origin: 'http://localhost:3000', credentials: true }));
  }

  private routes(): void {
    this.express.use('/auth', authRouter);
  }
}

export default new HttpApp().express;
