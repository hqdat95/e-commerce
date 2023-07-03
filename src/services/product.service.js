import { Op } from 'sequelize';
import db from '../models/index';
import search from './search.service.js';
import throwError from '../helpers/error.helper';

const findProducts = async (queryParams, paranoid) => {
  let {
    id: productId,
    c: categoryId,
    q: searchQuery,
    page = 1,
    pageSize = 10,
    min: minPrice,
    max: maxPrice,
  } = queryParams;

  const options = {
    paranoid,
    order: [['name', 'ASC']],
    limit: pageSize,
    offset: (Math.max(1, page) - 1) * pageSize,
    where: {},
  };

  const searchOptions = { ...options };

  if (productId) options.where.id = productId;
  if (categoryId) options.where.categoryId = categoryId;

  const priceFilters = [];
  if (minPrice) priceFilters.push({ price: { [Op.gte]: minPrice } });
  if (maxPrice) priceFilters.push({ price: { [Op.lte]: maxPrice } });

  if (priceFilters.length) options.where = { ...options.where, [Op.and]: priceFilters };

  if (!paranoid) options.where.deletedAt = { [Op.ne]: null };

  const products = searchQuery
    ? await search(searchQuery, searchOptions)
    : await db.Product.findAll(options);

  if (productId && !products.length) throwError('No product found', 404);

  return products;
};

export const find = async (queryParams) => {
  return await findProducts(queryParams, true);
};

export const findWithRemoved = async (queryParams) => {
  return await findProducts(queryParams, false);
};

export const create = async (data) => {
  const { name, categoryId } = data;

  const category = await db.Category.findByPk(categoryId);
  if (!category) throwError('Category not found', 404);

  const isExist = await db.Product.findOne({ where: { name, categoryId } });
  if (isExist) throwError('Product already exists', 401);

  return db.Product.create(data);
};

export const update = async (id, data) => {
  const products = await find(id);

  const product = products[0];

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await product.update(data);

  return product.reload();
};

export const remove = async (id) => {
  return db.Product.destroy({ where: { id } });
};

export const restore = async (id) => {
  const products = await findWithRemoved(id);

  const product = products[0];

  return await product.restore();
};
