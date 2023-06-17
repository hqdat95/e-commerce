import Joi from 'joi';
import { userSchema } from './users.validator';

const loginSchema = Joi.object({
  grant_type: Joi.string().required(),
})
  .when(Joi.object({ grant_type: 'local' }).unknown(), {
    then: userSchema(['email', 'password']),
  })
  .when(Joi.object({ grant_type: 'google' }).unknown(), {
    then: Joi.object({ code: Joi.string().required() }),
  });

const passwordSchema = Joi.object({
  grant_type: Joi.string().required(),
})
  .when(Joi.object({ grant_type: 'forgot' }).unknown(), {
    then: userSchema(['email']),
  })
  .when(Joi.object({ grant_type: ['reset', 'change'] }).unknown(), {
    then: Joi.object({
      new_password: userSchema().extract('password'),
      old_password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .when('grant_type', { is: 'change', then: Joi.required() }),
    }),
  });

export { loginSchema, passwordSchema };
