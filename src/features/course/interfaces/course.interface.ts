import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ICourseDocument extends Document {
  _id: string | ObjectId;
  name?: string;
  idStudents: mongoose.Types.ObjectId[];
  createdAt?: Date;
}
