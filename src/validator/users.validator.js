import Joi from 'joi';
import isRoles from '../constants/users.roles';

export default () => {
  return {
    fullName: Joi.string().min(6).required().label('Full Name'),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .label('Email'),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      .label('Password'),
    role: Joi.string()
      .valid(...Object.values(isRoles))
      .default(isRoles.CUSTOMER)
      .optional()
      .label('Role'),
  };
};
