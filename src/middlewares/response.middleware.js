const formatRes = (req, res, next) => {
  res.success = (data, keys) => {
    let resData;

    switch (true) {
      case Array.isArray(data) && Array.isArray(keys):
        resData = data.map((item) => {
          const filteredItem = {};
          for (const key of keys) {
            if (item[key] !== undefined) {
              filteredItem[key] = item[key];
            }
          }
          return filteredItem;
        });
        break;

      case Array.isArray(keys):
        resData = keys.reduce((accData, key) => {
          if (data[key] !== undefined) {
            accData[key] = data[key];
          }
          return accData;
        }, {});
        break;

      default:
        resData = data;
        break;
    }

    return res.status(200).json({ success: true, data: resData });
  };

  next();
};

export default formatRes;
