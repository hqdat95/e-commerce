import Joi from 'joi';

const baseSchema = {
  id: Joi.string().guid({ version: 'uuidv4' }).required().label('ID'),
  totalPrice: Joi.number().precision(2).required().label('Total Price'),
  status_order: Joi.string()
    .valid('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')
    .default('pending')
    .required()
    .label('Status Order'),
  isPaid: Joi.boolean().default(false).required().label('Is Paid'),
  userId: Joi.string().guid({ version: 'uuidv4' }).required().label('User ID'),
  transportInfoId: Joi.string().guid({ version: 'uuidv4' }).required().label('Transport Info ID'),
};

export const orderSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
