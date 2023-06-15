import db from '../models/index';
import throwError from '../helpers/error.helper';

export const findOne = async (id, paranoid = true) => {
  const user = await db.User.findOne({ where: { id }, paranoid });

  if (!user) throwError('User Not Found', 404);

  return user;
};

export const findAll = async (paranoid = true) => {
  return await db.User.findAll({ order: [['fullName', 'ASC']], paranoid });
};

export const signup = async ({ fullName, email, password }) => {
  const isExist = await db.User.count({ where: { email }, paranoid: false });

  if (isExist > 0) throwError('Email already exists!', 401);

  return await db.User.create({ fullName, email, password });
};

export const update = async (id, fullName) => {
  const existingUsers = await db.User.count({ where: { fullName } });

  if (existingUsers > 0) throwError('Full Name already in use', 409);

  const user = await findOne(id);

  await user.update({ fullName });

  return user;
};

export const remove = async (id) => {
  return db.User.destroy({ where: { id } });
};

export const restore = async (id) => {
  const user = await findOne(id, false);

  if (!user.deletedAt) throwError('User is not removed', 400);

  await user.restore();

  return user;
};
