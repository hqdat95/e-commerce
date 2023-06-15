import Joi from 'joi';

const baseSchema = {
  fullName: Joi.string().min(6).required().label('Full Name'),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .label('Email'),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .label('Password'),
  role: Joi.string().valid('admin', 'customer').default('customer').label('Role'),
};

export const userSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
