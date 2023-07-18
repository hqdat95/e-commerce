import Joi from 'joi';
import userSchema from './users.validator';

export default {
  local: {
    grant_type: 'local',
    email: userSchema().email,
    password: userSchema().password,
  },
  google: {
    grant_type: 'google',
    code: Joi.string().required(),
  },
};
