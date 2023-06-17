import { Request, Response, NextFunction } from 'express';
import { StudentModel } from '@student/models/student.schema';
import { NotFoundError } from '@helpers/errors/notFoundError';

export class StudentMiddleware {
  public async verifyStudent(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const count: number = await StudentModel.countDocuments();
    if (count === 0) {
      throw new NotFoundError('please enter students, because they were not found');
    }
    next();
  }
}

export const studentMiddleware: StudentMiddleware = new StudentMiddleware();
