"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videoController.index);
rootRouter.route("/signup").all(_middlewares.publicOnly).get(_userController.getSignup).post(_userController.postSignup);
rootRouter.route("/signin").all(_middlewares.publicOnly).get(_userController.getSignin).post(_userController.postSignin);
rootRouter.get("/search", _videoController.search);
var _default = rootRouter;
exports["default"] = _default;