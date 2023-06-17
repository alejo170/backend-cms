import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '@course/models/course.schema';
import { NotFoundError } from '@helpers/errors/notFoundError';

export class CourseMiddleware {
  public async verifyCourse(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const count: number = await CourseModel.countDocuments();
    if (count === 0) {
      throw new NotFoundError('please enter courses, because they were not found');
    }
    next();
  }
}

export const courseMiddleware: CourseMiddleware = new CourseMiddleware();
