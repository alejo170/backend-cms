import mongoose, { model, Model, Schema } from 'mongoose';
import { ICourseDocument } from '@course/interfaces/course.interface';

const courseSchema: Schema = new Schema({
  name: { type: 'String' },
  idStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now() }
});

const CourseModel: Model<ICourseDocument> = model<ICourseDocument>('Course', courseSchema, 'Course');
export { CourseModel };
