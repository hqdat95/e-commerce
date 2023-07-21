import * as transportInfoService from '../services/transportInfo.service';

export const getTemp = async (req, res) => {
  const result = req.session.tempTransportInfo;

  res.success(result);
};

export const getTempById = async (req, res) => {
  const { id } = req.params;

  const result = await transportInfoService.getTempById(req, id);

  res.success(result);
};

export const createTemp = async (req, res) => {
  const { name, phone, address } = req.body;

  const result = await transportInfoService.createTemp(req, name, phone, address);

  res.success(result);
};

export const updateTemp = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await transportInfoService.updateTemp(req, id, data);

  res.success(result);
};

export const deleteTemp = async (req, res) => {
  const { id } = req.params;

  await transportInfoService.deleteTemp(req, id);

  res.success();
};

export const findAllRemoved = async (req, res) => {
  const userId = req.user.id;

  const result = await transportInfoService.findAll(userId, false);

  res.success(result);
};

export const findOneRemoved = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await transportInfoService.findOne(userId, id, false);

  res.success(result);
};

export const findAll = async (req, res) => {
  const userId = req.user.id;

  const result = await transportInfoService.findAll(userId);

  res.success(result);
};

export const findOne = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await transportInfoService.findOne(userId, id);

  res.success(result);
};

export const create = async (req, res) => {
  const userId = req.user.id;
  const { name, phone, address } = req.body;

  const result = await transportInfoService.create(userId, name, phone, address);

  res.success(result);
};

export const update = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const data = req.body;

  const result = await transportInfoService.update(userId, id, data);

  res.success(result);
};

export const remove = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await transportInfoService.remove(userId, id);

  res.success();
};

export const restore = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await transportInfoService.restore(userId, id);

  res.success(result);
};