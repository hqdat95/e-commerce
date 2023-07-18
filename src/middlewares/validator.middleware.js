import Joi from 'joi';
import throwError from '../helpers/error.helper';

export default (schemaFunc) => (req, res, next) => {
  const fields = Object.keys(req.body);
  const baseSchema = schemaFunc();

  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  const validationSchema = Joi.object(selectedFields).unknown();

  const { error } = validationSchema.validate(req.body);

  if (error) throwError(error.details[0].message, 400);

  next();
};
