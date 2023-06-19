import * as productService from '../services/products.service';

export const search = async (req, res, next) => {
  try {
    const keywords = req.query.q;

    const result = await productService.search(keywords);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const result = await productService.findByCategory(categoryId);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const result = await productService.findAll();

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findAllActive = async (req, res, next) => {
  try {
    const result = await productService.findAllActive();

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findAllRemoved = async (req, res, next) => {
  try {
    const result = await productService.findAllRemoved();

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productService.findById(id);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const findRemoved = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productService.findRemoved(id);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name, description, price, quantity, categoryId } = req.body;

    const result = await productService.create(name, description, price, quantity, categoryId);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const result = await productService.update(id, name, description, price, quantity);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productService.remove(id);

    res.success(result);
  } catch (err) {
    next(err);
  }
};

export const restore = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await productService.restore(id);

    res.success(result);
  } catch (err) {
    next(err);
  }
};
