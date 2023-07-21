import Joi from 'joi';

export default () => {
  return {
    quantity: Joi.number().integer().greater(0).required().label('Quantity'),
    orderId: Joi.string().required().label('Order ID'),
    productId: Joi.string().required().label('Product ID'),
  };
};
