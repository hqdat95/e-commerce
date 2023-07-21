import * as orderItemServ from '../services/orderItem.service';

export const findAllWithRemoved = async (req, res) => {
  const result = await orderItemServ.findAll(false);

  res.success(result);
};

export const findAllWithRemovedByOrderId = async (req, res) => {
  const { orderId } = req.params;

  const result = await orderItemServ.findAll(orderId, false);

  res.success(result);
};

export const findOneWithRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await orderItemServ.findOne(id, false);

  res.success(result);
};

export const findAll = async (req, res) => {
  const { field, order } = req.query;

  const result = await orderItemServ.findAll(undefined, field, order);

  res.success(result);
};

export const findAllByOrderId = async (req, res) => {
  const { orderId } = req.params;

  const result = await orderItemServ.findAll(orderId);

  res.success(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await orderItemServ.findOne(id);

  res.success(result);
};

export const create = async (req, res) => {
  const { quantity, orderId, productId } = req.body;

  const result = await orderItemServ.create(quantity, orderId, productId);

  res.success(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const result = await orderItemServ.update(id, quantity);

  res.success(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  await orderItemServ.remove(id);

  res.success();
};

export const restore = async (req, res) => {
  const { id } = req.params;

  await orderItemServ.restore(id);

  res.success('Restore Successfully.');
};
