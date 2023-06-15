import schema from '../validator/index.validator';
import ErrorHandler from '../helpers/error.helper';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw new ErrorHandler(error.details[0].message, 400);
  }

  next();
};
