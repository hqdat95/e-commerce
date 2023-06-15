import Joi from 'joi';

const baseSchema = {
  name: Joi.string().required().label('Name'),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .label('Phone'),
  address: Joi.string().required().label('Address'),
  userId: Joi.string().guid({ version: 'uuidv4' }).required().label('User Id'),
};

export const transportInfoSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
