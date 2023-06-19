import { Op } from 'sequelize';
import { findAll } from './product.service';

export default async (req, searchQuery) => {
  if (!searchQuery) return [];

  const words = searchQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .map((word) => ({ name: { [Op.substring]: word } }));

  const products = await findAll(req, true, { where: { [Op.and]: words } });

  return products;
};
