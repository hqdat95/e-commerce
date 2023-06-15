import Joi from 'joi';

const baseSchema = {
  id: Joi.string().guid({ version: 'uuidv4' }).required().label('ID'),
  url: Joi.string().uri().required().label('URL'),
  productId: Joi.string().guid({ version: 'uuidv4' }).required().label('Product ID'),
};

export const productImageSchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
