import db from '../models/index';
import paginationService from './pagination.service';
import throwError from '../helpers/error.helper';

export const findOne = async (id, paranoid = true) => {
  const product = await db.Product.findOne({ where: { id }, paranoid });

  if (!product) throwError('No product found', 404);

  return product;
};

export const findAll = async (req, paranoid = true, options = {}) => {
  const totalProducts = await db.Product.count({
    where: { ...options.where },
    paranoid,
  });

  const { limit, offset } = paginationService(req, totalProducts);

  const products = await db.Product.findAll({
    where: { ...options.where },
    limit,
    offset,
    paranoid,
  });

  if (products.length === 0) {
    req.session.page = 1;
    return findAll(req, paranoid, options);
  }

  return products;
};

export const findByCategoryId = async (req, categoryId, paranoid = true) => {
  const queryConditions = { categoryId };

  return findAll(req, paranoid, { where: queryConditions });
};

export const create = async (data) => {
  const category = await db.Category.findByPk(data.categoryId);

  if (!category) throwError('Category not found', 404);

  await checkProductExistence(data.name, data.categoryId);

  return db.Product.create(data);
};

export const update = async (id, data) => {
  const product = await findOne(id);

  if (data.name) {
    await checkProductExistence(data.name, product.categoryId);
  }

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await product.update(data);

  return product.reload();
};

export const remove = async (id) => {
  return db.Product.destroy({ where: { id } });
};

export const restore = async (id) => {
  const product = await findOne(id, false);

  return await product.restore();
};

const checkProductExistence = async (name, categoryId) => {
  const isExist = await db.Product.count({
    where: { name, categoryId },
  });

  if (isExist) throwError('Product already exists in this category', 401);
};
