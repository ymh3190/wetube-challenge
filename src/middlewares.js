import multer from "multer";

const avatarMulter = multer({ dest: "uploads/images" });
const videoMulter = multer({ dest: "uploads/videos" });

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  next();
};

export const uploadAvatar = avatarMulter.single("avatar");
export const uploadVideo = videoMulter.single("video");
