import { Response } from 'express';
import { IStudentDocument } from '@student/interfaces/student.interface';

// GIVEN STEP

// MOCK 1: REQUEST
export const studentMockRequest = (body: IStudentMock) => ({
  body
});

// MOCK 2: RESPONSE
export const studentMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// INTERFACES
export interface IStudentMock {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  age?: number;
  createdAt?: Date | string;
}

// MOCK VALUES
export const studentMock = {
  _id: '60263f14648fed5246e322d3',
  firstname: 'alejandro',
  lastname: 'lopez',
  email: 'alejo170@gmail.com',
  age: 30,
  createdAt: new Date(),
  save: () => {}
} as unknown as IStudentDocument;
