import db from '../models/index';
import * as productServ from './product.service';
import throwError from '../helpers/error.helper';

export const create = async (userId, productId) => {
  const quantity = 1;
  console.log('quantity', quantity);

  await productServ.findOne(productId);

  const cartItem = await db.CartItem.findOne({ where: { userId, productId } });

  if (cartItem) {
    return cartItem.update({ quantity: cartItem.quantity + quantity });
  }

  return db.CartItem.create({ userId, quantity, productId });
};
