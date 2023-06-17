import { CustomError } from './customError';
import HTTP_STATUS from 'http-status-codes';
/* Solid Principle: open-closed Principle: permite la extensión de la funcionalidad existente (clase CustomError) 
sin modificar su implementación. Al crear una nueva clase BadRequestError que hereda de CustomError, 
se agrega un nuevo tipo de error sin alterar la clase base. */
export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
