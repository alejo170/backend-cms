import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IStudentDocument extends Document {
  _id: string | ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  age?: number;
  createdAt?: Date;
}
