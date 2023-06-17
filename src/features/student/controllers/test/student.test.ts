import { Request, Response } from 'express';
import { studentMock, studentMockRequest, studentMockResponse } from '@root/shared/globals/mocks/student.mock';
import { StudentController } from '../studentController';
import { CustomError } from '@helpers/errors/customError';
import { studentService } from '@services/db/student.service';

jest.useFakeTimers();

describe('Student', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  // Design Pattern: Given-When-Then
  // UNITARY TEST 1
  it('should throw an error if firstname is not available', async () => {
    // GIVEN STEP
    const req: Request = studentMockRequest({
      firstname: '',
      lastname: 'lopez',
      email: 'alejo170@gmail.com',
      age: 20
    }) as Request;
    const res: Response = studentMockResponse();

    // WHEN STEP
    await StudentController.prototype.add_student(req, res).catch((error: CustomError) => {
      // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('Firstname is a required field');
    });
  });

  // INTEGRATION TEST 1
  it('should throw error is user already exist', async () => {
    // GIVEN STEP
    const req: Request = studentMockRequest({
      firstname: 'alejandro',
      lastname: 'lopez',
      email: 'alejo170@gmail.com',
      age: 31
    }) as Request;
    const res: Response = studentMockResponse();

    // WHEN STEP
    jest.spyOn(studentService, 'getStudentByEmail').mockResolvedValue(studentMock);
    await StudentController.prototype.add_student(req, res).catch((error: CustomError) => {
      // THEN STEP: ASSERT
      expect(error.statusCode).toEqual(400);
      expect(error.serializeErrors().message).toEqual('This email is already registered');
    });
  });
});
