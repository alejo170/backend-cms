import { CustomError } from './customError';
import HTTP_STATUS from 'http-status-codes';

export class JoiRequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
