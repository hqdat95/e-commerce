import { Op } from 'sequelize';
import db from '../models/index';
import ErrorHandler from '../helpers/error.helper';

export const search = async (keywords) => {
  const products = await db.Product.findAll({
    where: {
      name: {
        [Op.like]: '%' + keywords + '%',
      },
    },
  });

  if (!products) {
    throw new ErrorHandler('No products found', 404);
  }

  return products;
};

export const findByCategory = async (categoryId) => {
  const products = await db.Product.findAll({
    where: { categoryId },
  });

  if (!products) {
    throw new ErrorHandler('No products found for this category', 404);
  }

  return products;
};

export const findAll = async () => {
  const products = await db.Product.findAll({
    where: {
      [Op.or]: [{ deletedAt: { [Op.eq]: null } }, { deletedAt: { [Op.ne]: null } }],
    },
    paranoid: false,
    order: [
      ['deletedAt', 'ASC'],
      ['createdAt', 'ASC'],
    ],
  });

  return products;
};

export const findAllActive = async () => {
  return db.Product.findAll({
    order: [['name', 'ASC']],
  });
};

export const findAllRemoved = async () => {
  return db.Product.findAll({
    where: { deletedAt: { [Op.not]: null } },
    paranoid: false,
    order: [['name', 'ASC']],
  });
};

export const findById = async (id) => {
  const product = await db.Product.findByPk(id);

  if (!product) {
    throw new ErrorHandler('Product Not Found', 404);
  }

  return product;
};

export const findRemoved = async (id) => {
  const product = await db.Product.findOne({
    where: { id, deletedAt: { [Op.not]: null } },
    paranoid: false,
  });

  if (!product) {
    throw new ErrorHandler('Product Not Found', 404);
  }

  return product;
};

export const create = async (name, description, price, quantity, categoryId) => {
  const isExist = await db.Product.findOne({
    where: { name, categoryId },
  });

  if (isExist) {
    throw new ErrorHandler('Product already exists', 401);
  }

  const product = await db.Product.create({ name, description, price, quantity, categoryId });

  return product;
};

export const update = async (id, name, description, price, quantity) => {
  const product = await findById(id);

  const fields = {
    name,
    description,
    price,
    quantity,
  };

  Object.keys(fields).forEach((key) => fields[key] === undefined && delete fields[key]);

  await product.update(fields);

  return product;
};

export const remove = async (id) => {
  const product = await findById(id);

  return product.destroy();
};

export const restore = async (id) => {
  const product = await findRemoved(id);

  await db.Product.restore({
    where: { id: product.id },
  });

  return product;
};
