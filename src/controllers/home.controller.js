export const homePage = async (req, res, next) => {
  try {
    return res.render('home.ejs');
  } catch (err) {
    next(err);
  }
};

export const aboutPage = async (req, res, next) => {
  try {
    return res.render('about.ejs');
  } catch (err) {
    next(err);
  }
};
