import multer from "multer";

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  next();
};

export const privateOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }
  return res.redirect("/");
};

export const publicOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }
  return next();
};

export const avatarMulter = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 2000000 },
});
export const videoMulter = multer({
  dest: "uploads/videos",
  limits: { fileSize: 20000000 },
});
