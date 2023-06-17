import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { studentSchema } from '@student/schemes/student';
import { IStudentDocument } from '@student/interfaces/student.interface';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { studentService } from '@services/db/student.service';
import { CourseModel } from '@course/models/course.schema';
import { StudentUtility } from './utilities/student.utility';

export class StudentController extends StudentUtility {
  @joiValidation(studentSchema)
  public async add_student(req: Request, res: Response): Promise<void> {
    const { _id, firstname, lastname, email, age } = req.body;

    await StudentController.prototype.validateStudentExistence(email);

    const createStudent: IStudentDocument = await studentService.addStudent(_id, firstname, lastname, email, age);
    if (!createStudent) {
      throw new BadRequestError('student not created');
    }
    res.status(HTTP_STATUS.CREATED).json({ message: 'Student created successfully', student: createStudent });
  }

  public async get_student(req: Request, res: Response): Promise<void> {
    const getStudent: IStudentDocument = await studentService.getStudent();
    if (!getStudent) {
      throw new BadRequestError('student not showed because it was not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Student showed successfully', student: getStudent });
  }
  @joiValidation(studentSchema)
  public async update_student(req: Request, res: Response): Promise<void> {
    const studentId = String(req.query._id);
    const { email } = req.body;
    const existingStudent = await studentService.getStudentById(studentId);
    if (!existingStudent) {
      throw new BadRequestError('Student not found');
    }

    if (email !== existingStudent.email) {
      await StudentController.prototype.validateStudentExistence(email);
    }

    const updateStudent: IStudentDocument = await studentService.updateStudentById(studentId, req.body);
    if (!updateStudent) {
      throw new BadRequestError('student not edited because it was not found');
    }
    res.status(HTTP_STATUS.OK).json({ message: 'Student updated successfully', student: updateStudent });
  }

  public async delete_student(req: Request, res: Response): Promise<void> {
    const studentId = String(req.query._id);
    const deleteStudent: IStudentDocument = await studentService.deleteStudentById(studentId);
    if (!deleteStudent) {
      throw new BadRequestError('student not deleted because it was not found');
    }
    await CourseModel.updateMany({}, { $pull: { idStudents: studentId } });

    res.status(HTTP_STATUS.OK).json({ message: 'Student deleted successfully', student: deleteStudent });
  }
}
