import mongoose from 'mongoose';
import { ICourseDocument } from '@course/interfaces/course.interface';
import { IStudentDocument } from '@student/interfaces/student.interface';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { courseService } from '@services/db/course.service';

export abstract class CourseUtility {
  protected async validateCourseExistence(name: string): Promise<void> {
    const existingCourse: ICourseDocument = await courseService.getCourseByName(name);
    if (existingCourse) {
      throw new BadRequestError('Course is already registered');
    }
  }

  protected validateStudents(idStudents: string[]): void {
    for (const idStudent of idStudents) {
      if (!mongoose.Types.ObjectId.isValid(idStudent)) {
        throw new BadRequestError('Invalid idStudent');
      }
    }
  }

  protected async validateExistingStudents(idStudents: string[]): Promise<void> {
    const existingStudents: IStudentDocument[] = await courseService.getExistingStudents(idStudents);
    if (existingStudents.length !== idStudents.length) {
      throw new BadRequestError('students cannot enroll in the course');
    }
  }
}
