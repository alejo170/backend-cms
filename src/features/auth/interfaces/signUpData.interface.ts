import { ObjectId } from 'mongodb';

export interface ISignUpData {
  _id: ObjectId;
  username: string;
  password: string;
}
