import { model, Model, Schema } from 'mongoose';
import { IStudentDocument } from '@student/interfaces/student.interface';

const studentSchema: Schema = new Schema({
  firstname: { type: 'String' },
  lastname: { type: 'String' },
  email: { type: 'String' },
  age: { type: 'Number' },
  createdAt: { type: Date, default: Date.now() }
});

const StudentModel: Model<IStudentDocument> = model<IStudentDocument>('Student', studentSchema, 'Student');
export { StudentModel };
