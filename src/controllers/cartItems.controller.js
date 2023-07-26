import * as cartItemServ from '../services/cartItem.service';

export const createTemp = async (req, res) => {
  const { productId } = req.body;

  const result = await cartItemServ.createTemp(productId);

  res.success(result);
};

export const create = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const result = await cartItemServ.create(userId, productId);

  res.success(result);
};
