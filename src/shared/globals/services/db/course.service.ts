import { ObjectId } from 'mongoose';
import { ICourseDocument } from '@course/interfaces/course.interface';
import { StudentModel } from '@student/models/student.schema';
import { CourseModel } from '@course/models/course.schema';
import { Generators } from '@helpers/generators/generators';
import { IStudentDocument } from '@student/interfaces/student.interface';

class CourseService {
  public async addCourse(name: string, idStudents: string[]): Promise<ICourseDocument> {
    const course: ICourseDocument = await CourseModel.create({
      name: name,
      idStudents: idStudents
    });
    return course;
  }

  public async getExistingStudents(idStudents: string[]): Promise<IStudentDocument[]> {
    const existingStudents: IStudentDocument[] = (await StudentModel.find({
      _id: { $in: idStudents }
    })) as unknown as IStudentDocument[];
    return existingStudents;
  }

  public async getCourse(): Promise<ICourseDocument> {
    const course: ICourseDocument = (await CourseModel.find().exec()) as unknown as ICourseDocument;
    return course;
  }

  public async getCourseById(id: string): Promise<ICourseDocument> {
    const course: ICourseDocument = (await CourseModel.findById(id).exec()) as ICourseDocument;
    return course;
  }

  public async getCourseByName(name: string): Promise<ICourseDocument> {
    const course: ICourseDocument = (await CourseModel.findOne({
      name: Generators.firstLetterUppercase(name)
    }).exec()) as ICourseDocument;
    return course;
  }

  public async updateCourseById(pId: string, params: ObjectId): Promise<ICourseDocument> {
    const course: ICourseDocument = (await CourseModel.findOneAndUpdate(
      { _id: pId },
      { $set: params },
      { new: true }
    ).exec()) as ICourseDocument;
    return course;
  }

  public async deleteCourseById(Id: string): Promise<ICourseDocument> {
    const course: ICourseDocument = (await CourseModel.findByIdAndDelete({ _id: Id }).exec()) as ICourseDocument;
    return course;
  }
}

export const courseService: CourseService = new CourseService();
