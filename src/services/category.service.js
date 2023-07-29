import { Op } from 'sequelize';
import db from '../models/index';
import throwError from '../helpers/error.helper';

export const findOne = async (id, paranoid = true) => {
  const category = await db.Category.findOne({ where: { id }, paranoid });

  if (!category) throwError('Category Not Found', 404);

  return category;
};

export const findAll = async (parentId = null, paranoid = true) => {
  return await db.Category.findAll({
    where: { parentId: parentId ? parentId : { [Op.is]: null } },
    order: [['parentId', 'ASC']],
    paranoid,
  });
};

export const create = async (name, parentId = null) => {
  if (parentId !== null) {
    const parentCategory = await db.Category.findByPk(parentId);
    if (!parentCategory) throwError('Invalid parentId', 404);
  }

  await checkExistence(name, parentId);

  return await db.Category.create({ name, parentId });
};

export const update = async (id, name) => {
  const category = await findOne(id);

  await checkExistence(name, category.parentId);

  return await category.update({ name });
};

export const remove = async (id) => {
  const category = await findOne(id);

  return processCategory(category, (item) => item.destroy());
};

export const restore = async (id) => {
  const category = await findOne(id, false);

  if (!category.deletedAt) throwError('Category has not been removed', 400);

  return processCategory(category, (item) => item.restore());
};

const processCategory = async (category, action) => {
  const children = await findAll(category.id, false);

  const categories = await action(category);

  if (Array.isArray(children) && children.length > 0) {
    await Promise.all(children.map((child) => processCategory(child, action)));
  }

  return categories;
};

const checkExistence = async (name, parentId) => {
  const isExist = await db.Category.findOne({ where: { name, parentId } });

  if (isExist) throwError('Category already exists', 401);
};
