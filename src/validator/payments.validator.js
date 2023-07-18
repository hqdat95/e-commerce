import Joi from 'joi';

export default () => {
  return {
    method: Joi.string().valid('cod', 'stripe').required().label('Method'),
    amount: Joi.number().precision(2).required().label('Amount'),
    orderId: Joi.string().guid({ version: 'uuidv4' }).required().label('Order ID'),
  };
};
