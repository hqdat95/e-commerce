import * as productImageService from '../services/productImage.service';

export const findAll = async (req, res) => {
  const result = await productImageService.findAll();

  res.success(result);
};

export const findWithRemoved = async (req, res) => {
  const result = await productImageService.findAll(false);

  res.success(result);
};

export const findImages = async (req, res) => {
  const { productId } = req.params;

  const result = await productImageService.findImages(productId);

  res.success(result);
};

export const upload = async (req, res) => {
  const { productId } = req.params;

  const files = Array.isArray(req.files) ? req.files : [req.file];

  const result = await productImageService.upload(productId, files);

  res.success(result);
};

export const update = async (req, res) => {
  const { productId } = req.params;

  const files = Array.isArray(req.files) ? req.files : [req.file];

  const result = await productImageService.update(productId, files);

  res.success(result);
};

export const remove = async (req, res) => {
  const { productId } = req.params;

  await productImageService.remove(productId);

  res.success();
};

export const restore = async (req, res) => {
  const { productId } = req.params;

  const result = await productImageService.restore(productId);

  res.success(result);
};
