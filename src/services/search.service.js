import { Op } from 'sequelize';
import db from '../models/index';

export default async (searchQuery, options) => {
  if (!searchQuery) return [];

  const words = searchQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .map((word) => ({ name: { [Op.substring]: word } }));

  const products = await db.Product.findAll({
    where: { [Op.or]: words },
    ...options,
  });

  return products
    .map((product) => ({
      product,
      score: words.reduce((score, word) => {
        const index = product.name.toLowerCase().indexOf(word.name[Op.substring]);
        return score + (index !== -1 ? (index === 0 ? 2 : 1) : 0);
      }, 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
};
