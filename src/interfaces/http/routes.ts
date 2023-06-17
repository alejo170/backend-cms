import { Application } from 'express';
import { Request, Response } from 'express';
import { config } from '@configs/configEnvs';
import { authRoutes } from '@auth/routes/authRoutes';
import { studentRoutes } from '@student/routes/studentRoutes';
import { courseRoutes } from '@course/routes/courseRoutes';

export default (app: Application) => {
  const routes = () => {
    app.use('/healtcheck', (_req: Request, res: Response) => res.send('Server is OK!'));
    app.use(config.BASE_PATH!, authRoutes.routes());
    app.use(config.BASE_PATH!, studentRoutes.routes());
    app.use(config.BASE_PATH!, courseRoutes.routes());
  };
  routes();
};
