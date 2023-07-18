import Joi from 'joi';
import throwError from '../helpers/error.helper';

export default (validators) => (req, res, next) => {
  const { grant_type } = req.body;

  if (!grant_type) {
    return next();
  }

  const schema = Joi.object(validators[grant_type]);

  if (typeof schema.validate !== 'function') {
    throwError('Schema does not have validate method', 500);
  }

  const { error } = schema.validate(req.body);

  if (error) {
    throwError(error.details[0].message, 400);
  }

  next();
};
