import _ from 'lodash';

export default (req, res, next) => {
  res.success = (data, keys) => {
    if (!data) return res.sendStatus(204);

    const mapRes = _.cond([
      [_.isNumber, () => data],
      [_.isString, () => data],
      [_.isArray, (data) => _.map(data, (item) => _.pick(item, keys))],
      [_.isObject, (data) => _.pick(data, keys)],
      [_.stubTrue, () => data],
    ]);

    return res.status(200).json({
      success: true,
      data: mapRes(data),
    });
  };

  next();
};
