import * as productService from '../services/product.service';
import fields from '../utils/response.util';

export const find = async (req, res) => {
  const result = await productService.find(req.query);

  res.success(result, fields.productFind);
};

export const findWithRemoved = async (req, res) => {
  const result = await productService.findWithRemoved(req.query);

  res.success(result, fields.productFind);
};

export const create = async (req, res) => {
  const result = await productService.create(req.body);

  res.success(result, fields.productCreate);
};

export const update = async (req, res) => {
  const { id } = req.query;

  const result = await productService.update(id, req.body);

  res.success(result, fields.productUpdate);
};

export const remove = async (req, res) => {
  await productService.remove(req.query);

  res.success();
};

export const restore = async (req, res) => {
  const result = await productService.restore(req.query);

  res.success(result, fields.productRestore);
};
