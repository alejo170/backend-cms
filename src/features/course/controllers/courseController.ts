import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { courseSchema } from '@course/schemes/course';
import { ICourseDocument } from '@course/interfaces/course.interface';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { courseService } from '@services/db/course.service';
import { CourseUtility } from './utilities/course.utility';

export class CourseController extends CourseUtility {
  /* Design Pattern: Decorator: Se utiliza un decorador joiValidation para aplicar la validación de 
  esquemas de Joi a la función add_course. Este patrón permite agregar comportamientos adicionales 
  a la función sin modificar su implementación original. */
  @joiValidation(courseSchema)
  public async add_course(req: Request, res: Response): Promise<void> {
    const { name, idStudents } = req.body;

    await CourseController.prototype.validateCourseExistence(name);
    CourseController.prototype.validateStudents(idStudents);
    await CourseController.prototype.validateExistingStudents(idStudents);

    const createCourse: ICourseDocument = await courseService.addCourse(name, idStudents);
    if (!createCourse) {
      throw new BadRequestError('Course not created');
    }
    res.status(HTTP_STATUS.CREATED).json({ message: 'Course created successfully', course: createCourse });
  }

  public async get_course(_req: Request, res: Response): Promise<void> {
    const getCourse: ICourseDocument = await courseService.getCourse();
    if (!getCourse) {
      throw new BadRequestError('Course not showed because it was not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Course showed successfully', course: getCourse });
  }

  @joiValidation(courseSchema)
  public async update_course(req: Request, res: Response): Promise<void> {
    const courseId = String(req.query._id);
    const { name, idStudents } = req.body;
    const existingCourse = await courseService.getCourseById(courseId);

    if (!existingCourse) {
      throw new BadRequestError('Course not found');
    }

    if (name !== existingCourse.name) {
      await CourseController.prototype.validateCourseExistence(name);
    }
    CourseController.prototype.validateStudents(idStudents);
    await CourseController.prototype.validateExistingStudents(idStudents);

    const updateCourse: ICourseDocument = await courseService.updateCourseById(courseId, req.body);
    if (!updateCourse) {
      throw new BadRequestError('Course not edited because it was not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Course updated successfully', course: updateCourse });
  }

  public async delete_course(req: Request, res: Response): Promise<void> {
    const courseId = String(req.query._id);
    const deleteCourse: ICourseDocument = await courseService.deleteCourseById(courseId);
    if (!deleteCourse) {
      throw new BadRequestError('Course not deleted because it was not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Course deleted successfully', course: deleteCourse });
  }
}
