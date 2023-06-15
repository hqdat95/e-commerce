import * as userService from '../services/user.service';

export const findAllWithRemoved = async (req, res) => {
  const result = await userService.findAll(false);

  res.success(result);
};

export const findOneWithRemoved = async (req, res) => {
  const { id } = req.params;

  const result = await userService.findOne(id, false);

  res.success(result);
};

export const findAll = async (req, res) => {
  const result = await userService.findAll();

  res.success(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await userService.findOne(id);

  res.success(result);
};

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const result = await userService.signup({ fullName, email, password });

  res.success(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { fullName } = req.body;

  const result = await userService.update(id, fullName);

  res.success(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  await userService.remove(id);

  res.success();
};

export const restore = async (req, res) => {
  const { id } = req.params;

  const result = await userService.restore(id);

  res.success(result);
};
