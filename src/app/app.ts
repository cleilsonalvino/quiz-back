import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    // The __dirname in ES modules is different.
    // When this runs from dist/app/app.js, __dirname is dist/app.
    // We need to go up two levels to the project root.
    const projectRoot = path.join(__dirname, '..', '..');
    this.server.use('/uploads', express.static(path.join(projectRoot, 'uploads')));
  }

  private routes(): void {
    this.server.use(router);
  }
}

export default new App().server;
