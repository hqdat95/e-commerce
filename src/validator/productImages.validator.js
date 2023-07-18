import Joi from 'joi';

export default () => {
  return {
    url: Joi.string().uri().required().label('URL'),
    productId: Joi.string().guid({ version: 'uuidv4' }).required().label('Product ID'),
  };
};
