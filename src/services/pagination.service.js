export default (req, totalProducts, pageSize = 10) => {
  req.session.page = req.session.page || 1;

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (req.session.page > totalPages) {
    req.session.regenerate(async (err) => {
      req.session.page = 1;
    });
  }

  const limit = pageSize;
  const offset = (Math.max(1, req.session.page) - 1) * pageSize;

  req.session.page++;

  return { limit, offset };
};
