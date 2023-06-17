export default (req, res, next) => {
  res.success = (data) => {
    if (!data) return res.sendStatus(204);

    return res.status(200).json({
      success: true,
      result: data,
    });
  };

  next();
};
