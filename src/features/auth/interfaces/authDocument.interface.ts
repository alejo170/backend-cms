import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IAuthDocument extends Document {
  _id: string | ObjectId;
  username: string;
  password?: string;
  comparePassword(password: string): Promise<boolean>;
}
