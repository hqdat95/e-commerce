import Joi from 'joi';

export default () => {
  return {
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
};
