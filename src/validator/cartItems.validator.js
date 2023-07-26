import Joi from 'joi';

export default () => {
  return {
    quantity: Joi.number().integer().greater(0).optional().label('Quantity'),
    userId: Joi.string().required().label('User ID'),
    productId: Joi.string().required().label('Product ID'),
  };
};
