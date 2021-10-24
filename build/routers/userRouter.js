"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.route("/edit").all(_middlewares.privateOnly).get(_userController.getEdit).post(_middlewares.avatarMulter.single("avatar"), _userController.postEdit);
userRouter.route("/change-password").all(_middlewares.privateOnly).get(_userController.getChangePassword).post(_userController.postChangePassword);
userRouter.get("/github", _middlewares.publicOnly, _userController.githubLogin);
userRouter.get("/github/callback", _middlewares.publicOnly, _userController.callbackGithubLogin);
userRouter.get("/logout", _middlewares.privateOnly, _userController.logout);
userRouter.get(":id", _userController.see);
var _default = userRouter;
exports["default"] = _default;