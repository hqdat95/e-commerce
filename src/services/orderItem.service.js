import db from '../models/index';
import throwError from '../helpers/error.helper';
import * as productServ from './product.service';

export const findAll = async (orderId, field, order, paranoid = true) => {
  const sorted = await getSorted(field, order);

  return db.OrderItem.findAll({
    where: orderId ? { orderId } : {},
    order: [[sorted.field, sorted.order]],
    paranoid,
  });
};

export const findOne = async (id, paranoid = true) => {
  const orderItem = await db.OrderItem.findOne({ where: { id }, paranoid });

  if (!orderItem) throwError('Invalid Order Item ID !', 404);

  return orderItem;
};

export const create = async (quantity, orderId, productId) => {
  const orderItem = await db.Order.findByPk(orderId);
  if (!orderItem) throwError('Invalid Order ID !', 404);

  const product = await productServ.findOne(productId);

  return db.sequelize.transaction(async (transaction) => {
    const orderItem = await db.OrderItem.create(
      {
        quantity,
        orderId,
        productId,
        price: product.price * quantity,
      },
      { transaction },
    );

    await adjustQty(product, -quantity, transaction);

    return orderItem;
  });
};

export const update = async (id, quantity) => {
  const orderItem = await findOne(id);
  const product = await productServ.findOne(orderItem.productId);

  const quantityChange = quantity - orderItem.quantity;

  return db.sequelize.transaction(async (transaction) => {
    await orderItem.update({ quantity, price: product.price * quantity }, { transaction });

    await adjustQty(product, -quantityChange, transaction);

    return orderItem;
  });
};

export const remove = async (id) => {
  const orderItem = await findOne(id);
  const product = await productServ.findOne(orderItem.productId);

  return db.sequelize.transaction(async (transaction) => {
    await orderItem.destroy({ transaction });

    await adjustQty(product, orderItem.quantity, transaction);
  });
};

export const restore = async (id) => {
  const orderItem = await findOne(id, false);
  const product = await productServ.findOne(orderItem.productId);

  if (!orderItem.deletedAt) throwError('Order Items is not removed', 400);

  return db.sequelize.transaction(async (transaction) => {
    await orderItem.restore({ transaction });

    await adjustQty(product, -orderItem.quantity, transaction);
  });
};

const getSorted = async (field = 'orderId', order = 'desc') => {
  if (!['orderId', 'createdAt', 'productId'].includes(field)) {
    throwError(`Invalid field: ${field}`, 404);
  }

  if (!['desc', 'asc'].includes(order)) {
    throwError(`Invalid order: ${order}`, 404);
  }

  return { field, order };
};
const adjustQty = async (product, quantityChange, transaction) => {
  const newQuantity = product.quantity + quantityChange;

  if (newQuantity < 0) throwError('Out of Stock !', 400);

  product.quantity = newQuantity;

  await product.update({ quantity: newQuantity }, { transaction });
};
