import Joi from 'joi';

export default () => {
  return {
    quantity: Joi.number().integer().required().label('Quantity'),
    userId: Joi.string().guid({ version: 'uuidv4' }).required().label('User ID'),
    productId: Joi.string().guid({ version: 'uuidv4' }).required().label('Product ID'),
  };
};
