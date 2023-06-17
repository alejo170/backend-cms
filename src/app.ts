import express, { Express } from 'express';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';
import { CMSServer } from '@bootstrap/setupServer.bootstrap';
import { config } from '@configs/configEnvs';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: CMSServer = new CMSServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
