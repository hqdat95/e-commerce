import * as productService from '../services/product.service';
import searchService from '../services/search.service';

export const search = async (req, res) => {
  const searchQuery = req.query.q;

  const products = await searchService(req, searchQuery);

  res.success(products);
};

export const findByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  const result = await productService.findByCategoryId(req, categoryId);

  res.success(result);
};

export const findAllWithRemoved = async (req, res) => {
  const result = await productService.findAll(req, false);

  res.success(result);
};

export const findOneWithRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await productService.findOne(id, false);

  res.success(result);
};

export const findAll = async (req, res) => {
  const result = await productService.findAll(req);

  res.success(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await productService.findOne(id);

  res.success(result);
};

export const create = async (req, res) => {
  const data = req.body;

  const result = await productService.create(data);

  res.success(result);
};

export const update = async (req, res) => {
  const { id } = req.params;

  const result = await productService.update(id, req.body);

  res.success(result);
};

export const remove = async (req, res) => {
  await productService.remove(req.params.id);

  res.success();
};

export const restore = async (req, res) => {
  const result = await productService.restore(req.params.id);

  res.success(result);
};
