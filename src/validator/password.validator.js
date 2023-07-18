import userSchema from './users.validator';

export default {
  forgot: {
    grant_type: 'forgot',
    email: userSchema().email,
  },
  reset: {
    grant_type: 'reset',
    new_password: userSchema().password,
  },
  change: {
    grant_type: 'change',
    old_password: userSchema().password,
    new_password: userSchema().password,
  },
};
