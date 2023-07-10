import schema from '../validator/index.validator';
import throwError from '../helpers/error.helper';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throwError(error.details[0].message, 400);
  }

  next();
};

export const localLogin = validate(schema.loginSchema);
export const handlePassword = validate(schema.passwordSchema);
