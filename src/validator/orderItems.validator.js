import Joi from 'joi';

export default () => {
  return {
    quantity: Joi.number().integer().required().label('Quantity'),
    price: Joi.number().precision(2).required().label('Price'),
    orderId: Joi.string().guid({ version: 'uuidv4' }).required().label('Order ID'),
    productId: Joi.string().guid({ version: 'uuidv4' }).required().label('Product ID'),
  };
};
