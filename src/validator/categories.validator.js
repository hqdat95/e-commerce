import Joi from 'joi';

const baseSchema = {
  id: Joi.string().guid({ version: 'uuidv4' }).required().label('ID'),
  name: Joi.string().required().label('Name'),
  parentId: Joi.string().guid({ version: 'uuidv4' }).allow(null).label('Parent ID'),
};

export const categorySchema = (fields = Object.keys(baseSchema)) => {
  const selectedFields = fields.reduce((obj, field) => {
    if (baseSchema[field]) {
      obj[field] = baseSchema[field];
    }
    return obj;
  }, {});

  return Joi.object(selectedFields);
};
