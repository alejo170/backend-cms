import bcrypt from 'bcryptjs';
import { config } from '@configs/configEnvs';

export class Generators {
  static firstLetterUppercase(str: string): string {
    const valueString = str.toLowerCase();
    return valueString
      .split(' ')
      .map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
      .join(' ');
  }

  static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  static hash(password: string): Promise<string> {
    return bcrypt.hash(password, Number(config.SALT_ROUND));
  }
}
