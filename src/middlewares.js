import multer from "multer";

const videoMulter = multer({ dest: "uploads/videos" });

export const localsMiddlewares = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  next();
};

export const uploadVideo = videoMulter.single("videoFile");
