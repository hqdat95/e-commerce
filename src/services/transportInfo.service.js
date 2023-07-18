import db from '../models/index';
import { Op } from 'sequelize';
import throwError from '../helpers/error.helper';

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
    (await db.TransportInfo.update(
      { isDefault: false },
      { where: { userId: userId, id: { [Op.ne]: id } } },
    ));

  Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);

  await info.update(data);

  return info.reload();
};
