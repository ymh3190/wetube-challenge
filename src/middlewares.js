export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  next();
};
