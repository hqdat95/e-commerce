import db from '../models/index';
import * as driveService from './drive.service';
import throwError from '../helpers/error.helper';

export const findAll = async (paranoid = true) => {
  return db.ProductImage.findAll({ paranoid });
};

export const findImages = async (productId) => {
  const folderId = await getfolderId(productId);

  const files = await driveService.executeQuery(`'${folderId}' in parents`);

  return files.map((file) => file.id);
};

export const upload = async (productId, files) => {
  const product = await getProduct(productId);
  const folderUrl = await driveService.createAndUploadToFolder(product.name, files);

  let productImage = await db.ProductImage.findOne({ where: { url: folderUrl } });

  if (!productImage) {
    productImage = await db.ProductImage.create({
      url: folderUrl,
      productId,
    });
  }

  return folderUrl;
};

export const update = async (productId, files) => {
  const folderId = await getfolderId(productId);

  await driveService.manageImages(folderId, false, false);

  return upload(productId, files);
};

export const remove = async (productId) => {
  return db.ProductImage.destroy({ where: { productId } });
};

export const restore = async (productId) => {
  const productImages = await db.ProductImage.findOne({ where: { productId }, paranoid: false });

  if (!productImages) throwError('No product image found !', 404);

  return productImages.restore();
};

const getProduct = async (productId) => {
  const product = await db.Product.findByPk(productId);

  if (!product) throwError('No product found !', 404);

  return product;
};

const getfolderId = async (productId) => {
  const product = await getProduct(productId);
  const folderId = await driveService.getFolderId(product.name);

  if (!folderId) throwError('No folder found !', 404);

  return folderId;
};
