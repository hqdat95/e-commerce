import Joi from 'joi';
import _ from 'lodash';
import isRoles from '../constants/users.roles';

const baseSchema = {
  fullName: Joi.string().min(6).required().label('Full Name'),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .label('Email'),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .label('Password'),
  role: Joi.number().default(isRoles.CUSTOMER).optional().label('Role'),
};

export const userSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields).unknown();
};
