import JWT from 'jsonwebtoken';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { config } from '@configs/configEnvs';
import { ISignUpData } from '@auth/interfaces/signUpData.interface';
import { Generators } from '@helpers/generators/generators';

export abstract class SignUpUtility {
  protected signToken(data: IAuthDocument): string {
    return JWT.sign(
      {
        username: data.username
      },
      config.JWT_TOKEN!
    );
  }

  protected signUpData(data: ISignUpData): IAuthDocument {
    const { _id, username, password } = data;
    return {
      _id,
      username: Generators.firstLetterUppercase(username),
      password,
      createdAt: new Date()
    } as unknown as IAuthDocument;
  }
}
