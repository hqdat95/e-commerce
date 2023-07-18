import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().required().label('Name'),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label('Phone'),
    address: Joi.string().max(1000).required().label('Address'),
    isDefault: Joi.boolean().optional().label('IsDefault'),
  };
};
