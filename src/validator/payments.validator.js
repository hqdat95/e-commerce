import Joi from 'joi';

const baseSchema = {
  id: Joi.string().guid({ version: 'uuidv4' }).required().label('ID'),
  method: Joi.string().valid('cod', 'stripe').required().label('Method'),
  amount: Joi.number().precision(2).required().label('Amount'),
  orderId: Joi.string().guid({ version: 'uuidv4' }).required().label('Order ID'),
};

export const paymentSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
