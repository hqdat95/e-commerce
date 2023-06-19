const pick = (object, paths) => {
  const filteredItem = {};

  for (const path of paths) {
    if (!!object[path]) {
      filteredItem[path] = object[path];
    }
  }

  return filteredItem;
};

const mapRes = (data, keys) => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map((item) => pick(item, keys));
  }

  return pick(data, keys);
}

export default (req, res, next) => {
  res.success = (data, keys) => {
    return res.status(200).json({
      success: true,
      data: mapRes(data, keys)
    });
  };

  next();
};
