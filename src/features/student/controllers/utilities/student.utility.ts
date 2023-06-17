import { BadRequestError } from '@helpers/errors/badRequestError';
import { studentService } from '@services/db/student.service';

export abstract class StudentUtility {
  protected async validateStudentExistence(email: string): Promise<void> {
    const checkIfStudentExist = await studentService.getStudentByEmail(email);
    if (checkIfStudentExist) {
      throw new BadRequestError('This email is already registered');
    }
  }
}
