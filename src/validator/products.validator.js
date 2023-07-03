import Joi from 'joi';

const baseSchema = {
  name: Joi.string().required().label('Name'),
  description: Joi.string().allow('').optional().label('Description'),
  price: Joi.number().precision(2).greater(0).required().label('Price'),
  quantity: Joi.number().integer().min(0).required().label('Quantity'),
  categoryId: Joi.string().guid({ version: 'uuidv4' }).optional().label('Category ID'),
};

export const productSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields).unknown();
};
