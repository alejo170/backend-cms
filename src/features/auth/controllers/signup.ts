import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { SignUpUtility } from './utilities/signup.utility';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { Generators } from '@helpers/generators/generators';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';

export class SignUp extends SignUpUtility {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const checkIfUserExist = await authService.getAuthUserByUsername(username);
    if (checkIfUserExist) {
      throw new BadRequestError('Username already exists');
    }

    const authObjectId: ObjectId = new ObjectId();
    const passwordHash = await Generators.hash(password);
    const authData: IAuthDocument = SignUp.prototype.signUpData({
      _id: authObjectId,
      username,
      password: passwordHash
    });
    authService.createAuthUser(authData);
    const userJwt: string = SignUp.prototype.signToken(authData);
    req.session = { jwt: userJwt };

    res.status(HTTP_STATUS.CREATED).json({ message: 'User auth created successfully', user: authData, token: userJwt });
  }
}
