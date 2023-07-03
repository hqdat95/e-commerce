import schema from '../validator/index.validator';
import ErrorHandler from '../helpers/error.helper';

const validate = (schema) => (req, res, next) => {
  const fields = Object.keys(req.body);
  const { error } = schema(fields).validate(req.body);

  if (error) {
    throw new ErrorHandler(error.details[0].message, 400);
  }

  next();
};

export const productCreate = validate(schema.productSchema);
export const productUpdate = validate(schema.productSchema);
