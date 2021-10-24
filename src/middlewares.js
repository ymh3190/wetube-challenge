import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3AvatarMulter = multers3({
  s3: s3,
  bucket: "wetube-challenge-ymh3190/avatars",
  acl: "public-read",
});

const s3VideoMulter = multers3({
  s3: s3,
  bucket: "wetube-challenge-ymh3190/videos",
  acl: "public-read",
});

export const heroku = process.env.NODE_ENV === "production";

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
  storage: heroku ? s3AvatarMulter : undefined,
});
export const videoMulter = multer({
  dest: "uploads/videos",
  limits: { fileSize: 20000000 },
  storage: heroku ? s3VideoMulter : undefined,
});
