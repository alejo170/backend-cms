import Joi, { ObjectSchema } from 'joi';

const studentSchema: ObjectSchema = Joi.object().keys({
  firstname: Joi.string().required().min(2).max(50).messages({
    'string.base': 'Firstname must be of type string',
    'string.min': 'Invalid Firstname',
    'string.max': 'Invalid Firstname',
    'string.empty': 'Firstname is a required field'
  }),
  lastname: Joi.string().required().min(2).max(50).messages({
    'string.base': 'Lastname must be of type string',
    'string.min': 'Invalid Lastname',
    'string.max': 'Invalid Lastname',
    'string.empty': 'Lastname is a required field'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  }),
  age: Joi.number().strict().required().min(16).max(100).empty('').messages({
    'number.base': 'age must be of type number',
    'number.min': 'Invalid age',
    'number.max': 'Invalid age',
    'any.required': 'age is a required field'
  })
});

export { studentSchema };
