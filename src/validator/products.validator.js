import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().required().label('Name'),
    description: Joi.string().allow('').optional().label('Description'),
    price: Joi.number().precision(2).greater(0).required().label('Price'),
    quantity: Joi.number().integer().min(0).required().label('Quantity'),
    categoryId: Joi.string().guid({ version: 'uuidv4' }).optional().label('Category ID'),
  };
};
