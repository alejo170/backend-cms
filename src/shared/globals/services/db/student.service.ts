import { ObjectId } from 'mongoose';
import { IStudentDocument } from '@student/interfaces/student.interface';
import { StudentModel } from '@student/models/student.schema';
import { Generators } from '@helpers/generators/generators';

class StudentService {
  public async addStudent(
    Id: string,
    firstname: string,
    lastname: string,
    email: string,
    age: number
  ): Promise<IStudentDocument> {
    const user: IStudentDocument = await StudentModel.create({
      _id: Id,
      firstname: Generators.firstLetterUppercase(firstname),
      lastname: Generators.firstLetterUppercase(lastname),
      email: Generators.lowerCase(email),
      age: age
    });
    return user;
  }

  public async getStudent(): Promise<IStudentDocument> {
    const user: IStudentDocument = (await StudentModel.find().exec()) as unknown as IStudentDocument;
    return user;
  }

  public async getStudentById(id: string): Promise<IStudentDocument> {
    const user: IStudentDocument = (await StudentModel.findById(id).exec()) as IStudentDocument;
    return user;
  }

  public async getStudentByEmail(email: string): Promise<IStudentDocument> {
    const user: IStudentDocument = (await StudentModel.findOne({
      email: Generators.lowerCase(email)
    }).exec()) as IStudentDocument;
    return user;
  }

  public async updateStudentById(sId: string, params: ObjectId): Promise<IStudentDocument> {
    const user: IStudentDocument = (await StudentModel.findOneAndUpdate(
      { _id: sId },
      { $set: params },
      { new: true }
    ).exec()) as IStudentDocument;
    return user;
  }

  public async deleteStudentById(Id: string): Promise<IStudentDocument> {
    const user: IStudentDocument = (await StudentModel.findByIdAndDelete({ _id: Id }).exec()) as IStudentDocument;
    return user;
  }
}

export const studentService: StudentService = new StudentService();
