import Joi, { ObjectSchema } from 'joi';

const courseSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(50).messages({
    'string.base': 'Name must be of type string',
    'string.min': 'Invalid name',
    'string.max': 'Invalid name',
    'string.empty': 'Name is a required field'
  }),
  idStudents: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'IdStudents must be an array',
    'array.empty': 'IdStudents is a required field',
    'string.empty': 'Each student ID must be a non-empty string'
  })
});

export { courseSchema };
