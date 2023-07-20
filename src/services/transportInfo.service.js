import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../models/index';
import throwError from '../helpers/error.helper';

export const getTempById = async (req, id) => {
  const tempInfo = req.session.tempTransportInfo.filter((info) => info.id === id);

  if (tempInfo.length === 0) throwError('No temporary transport info found', 404);

  return tempInfo[0];
};

export const createTemp = async (req, name, phone, address) => {
  const transportInfo = { id: uuidv4(), name, phone, address };

  if (!req.session.tempTransportInfo) req.session.tempTransportInfo = [];

  req.session.tempTransportInfo.push(transportInfo);

  return transportInfo;
};

export const updateTemp = async (req, id, data) => {
  const transportInfo = await getTempById(req, id);

  Object.assign(transportInfo, data);

  return transportInfo;
};

export const deleteTemp = async (req, id) => {
  const infoLength = req.session.tempTransportInfo.length;

  req.session.tempTransportInfo = req.session.tempTransportInfo.filter((info) => info.id !== id);

  if (infoLength === req.session.tempTransportInfo.length) {
    throwError('No temporary transport info found to delete', 404);
  }
};

export const findAll = async (userId, paranoid = true) => {
  return await db.TransportInfo.findAll({
    where: { userId },
    order: [['isDefault', 'DESC']],
    paranoid,
  });
};

export const findOne = async (userId, id, paranoid = true) => {
  const result = await db.TransportInfo.findOne({ where: { id, userId }, paranoid });

  if (!result) throwError('Transport info not found', 404);

  return result;
};

export const create = async (userId, name, phone, address) => {
  const { count, rows } = await db.TransportInfo.findAndCountAll({ where: { userId } });

  if (count >= 5) throwError('User cannot have more than 5 transport infos', 400);

  const existingDefault = rows.find((info) => info.isDefault);

  const isDefault = !existingDefault;

  return await db.TransportInfo.create({ name, phone, address, userId, isDefault });
};

export const update = async (userId, id, data) => {
  const info = await findOne(userId, id);

  data.isDefault &&
    (await db.TransportInfo.update({ isDefault: false }, { where: { userId: userId, id: { [Op.ne]: id } } }));

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await info.update(data);

  return info.reload();
};

export const remove = async (userId, id) => {
  const info = await findOne(userId, id);

  if (info.isDefault) {
    await info.update({ isDefault: false });

    const newDefault = await db.TransportInfo.findOne({
      where: { userId, id: { [Op.ne]: id } },
      order: [['createdAt', 'ASC']],
    });

    newDefault && (await newDefault.update({ isDefault: true }));
  }

  await info.destroy();
};

export const restore = async (userId, id) => {
  const info = await findOne(userId, id, false);

  if (!info.deletedAt) throwError('Transport Info is not removed', 400);

  return await info.restore();
};
