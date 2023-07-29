import * as categoryService from '../services/category.service';

export const findAllWithRemoved = async (req, res) => {
  const parentId = req.query.c;

  const result = await categoryService.findAll(parentId, false);

  res.success(result);
};

export const findOneWithRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await categoryService.findOne(id, false);

  res.success(result);
};

export const findAll = async (req, res) => {
  const parentId = req.query.c;

  const result = await categoryService.findAll(parentId);

  res.success(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await categoryService.findOne(id);

  res.success(result);
};

export const create = async (req, res) => {
  const { name, parentId } = req.body;

  const result = await categoryService.create(name, parentId);

  res.success(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await categoryService.update(id, name);

  res.success(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  await categoryService.remove(id);

  res.success('Complete remove !');
};

export const restore = async (req, res) => {
  const { id } = req.params;

  const result = await categoryService.restore(id);

  res.success(result);
};
