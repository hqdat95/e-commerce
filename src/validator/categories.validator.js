import Joi from 'joi';

export default () => {
  return {
    name: Joi.string().min(2).required().label('Name'),
    parentId: Joi.string().guid({ version: 'uuidv4' }).allow(null).label('Parent ID'),
  };
};
