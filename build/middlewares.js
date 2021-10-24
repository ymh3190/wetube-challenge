"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoMulter = exports.publicOnly = exports.privateOnly = exports.localsMiddlewares = exports.avatarMulter = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddlewares = function localsMiddlewares(req, res, next) {
  res.locals.siteName = "WeTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  next();
};

exports.localsMiddlewares = localsMiddlewares;

var privateOnly = function privateOnly(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  }

  return res.redirect("/");
};

exports.privateOnly = privateOnly;

var publicOnly = function publicOnly(req, res, next) {
  if (req.session.loggedIn) {
    return res.redirect("/");
  }

  return next();
};

exports.publicOnly = publicOnly;
var avatarMulter = (0, _multer["default"])({
  dest: "uploads/avatars",
  limits: {
    fileSize: 2000000
  }
});
exports.avatarMulter = avatarMulter;
var videoMulter = (0, _multer["default"])({
  dest: "uploads/videos",
  limits: {
    fileSize: 20000000
  }
});
exports.videoMulter = videoMulter;