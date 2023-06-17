/* Solid Principle: Single Responsibility Principle: ya que tiene una única responsabilidad, 
que es representar la estructura de un error con sus propiedades relacionadas. */

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}
