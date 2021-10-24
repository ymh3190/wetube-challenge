"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.see = exports.postSignup = exports.postSignin = exports.postEdit = exports.postChangePassword = exports.logout = exports.githubLogin = exports.getSignup = exports.getSignin = exports.getEdit = exports.getChangePassword = exports.callbackGithubLogin = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getSignup = function getSignup(req, res) {
  return res.render("signup", {
    pageTitle: "회원가입"
  });
};

exports.getSignup = getSignup;

var postSignup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, password2, pageTitle, exists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;
            pageTitle = "회원가입";

            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).render("signup", {
              pageTitle: pageTitle,
              errMsg: "비밀번호가 일치하지 않습니다."
            }));

          case 4:
            _context.next = 6;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 6:
            exists = _context.sent;

            if (!exists) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).render("signup", {
              pageTitle: pageTitle,
              errMsg: "이메일 혹은 유저네임이 이미 존재합니다."
            }));

          case 9:
            _context.prev = 9;
            _context.next = 12;
            return _User["default"].create({
              username: username,
              email: email,
              password: password
            });

          case 12:
            return _context.abrupt("return", res.redirect("/signin"));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", res.status(400).render("signup", {
              pageTitle: pageTitle,
              errMsg: _context.t0._message
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 15]]);
  }));

  return function postSignup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postSignup = postSignup;

var getSignin = function getSignin(req, res) {
  return res.render("signin", {
    pageTitle: "Signin"
  });
};

exports.getSignin = getSignin;

var postSignin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, correct;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pageTitle = "로그인";
            _context2.next = 4;
            return _User["default"].findOne({
              username: username,
              isGithub: false
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("signin", {
              pageTitle: pageTitle,
              errMsg: "입력한 정보로 가입한 유저가 없습니다."
            }));

          case 7:
            correct = _bcrypt["default"].compare(password, user.password);

            if (correct) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("signin", {
              pageTitle: pageTitle,
              errMsg: "비밀번호를 틀렸습니다."
            }));

          case 10:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postSignin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postSignin = postSignin;

var githubLogin = function githubLogin(req, res) {
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var url = "https://github.com/login/oauth/authorize?".concat(params);
  return res.redirect(url);
};

exports.githubLogin = githubLogin;

var callbackGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var config, params, url, tokenRequest, access_token, _url, userData, emailData, emailObj, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            url = "https://github.com/login/oauth/access_token?".concat(params);
            _context3.next = 5;
            return (0, _nodeFetch["default"])(url, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 5:
            _context3.next = 7;
            return _context3.sent.json();

          case 7:
            tokenRequest = _context3.sent;

            if (!("access_token" in tokenRequest)) {
              _context3.next = 36;
              break;
            }

            access_token = tokenRequest.access_token;
            _url = "https://api.github.com/user";
            _context3.next = 13;
            return (0, _nodeFetch["default"])(_url, {
              method: "GET",
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 13:
            _context3.next = 15;
            return _context3.sent.json();

          case 15:
            userData = _context3.sent;
            _context3.next = 18;
            return (0, _nodeFetch["default"])("".concat(_url, "/emails"), {
              method: "GET",
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 18:
            _context3.next = 20;
            return _context3.sent.json();

          case 20:
            emailData = _context3.sent;
            emailObj = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });

            if (emailObj) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", res.redirect("/signin"));

          case 24:
            _context3.next = 26;
            return _User["default"].findOne({
              email: emailObj.email
            });

          case 26:
            user = _context3.sent;

            if (user) {
              _context3.next = 31;
              break;
            }

            _context3.next = 30;
            return _User["default"].create({
              username: userData.login,
              email: emailObj.email,
              password: "",
              isGithub: true,
              avatarUrl: userData.avatar_url
            });

          case 30:
            user = _context3.sent;

          case 31:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context3.abrupt("return", res.redirect("/"));

          case 36:
            return _context3.abrupt("return", res.redirect("/signin"));

          case 37:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function callbackGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.callbackGithubLogin = callbackGithubLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/");
};

exports.logout = logout;

var getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body3, username, email, file, exist, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, file = req.file; // 1. 로그인한 유저와 세션에 저장된 유저와 같은지 체크

            if (!(req.session.user._id === res.locals.user._id)) {
              _context4.next = 23;
              break;
            }

            // 2. 이메일과 유저네임 중복체크
            exist = false;

            if (!(username === req.session.user.username && email !== req.session.user.email)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 6;
            return _User["default"].exists({
              email: email
            });

          case 6:
            exist = _context4.sent;
            _context4.next = 16;
            break;

          case 9:
            if (!(email === req.session.user.email && username !== req.session.user.username)) {
              _context4.next = 15;
              break;
            }

            _context4.next = 12;
            return _User["default"].exists({
              username: username
            });

          case 12:
            exist = _context4.sent;
            _context4.next = 16;
            break;

          case 15:
            if (username === req.session.user.username && email === req.session.user.email) {
              exist = false;
            }

          case 16:
            if (!exist) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(400).render("edit-profile", {
              pageTitle: "Edit Profile",
              errMsg: "이메일 혹은 유저네임이 이미 존재합니다."
            }));

          case 18:
            _context4.next = 20;
            return _User["default"].findByIdAndUpdate(_id, {
              username: username,
              email: email,
              avatarUrl: file ? file.path : avatarUrl
            }, {
              "new": true
            });

          case 20:
            user = _context4.sent;
            req.session.user = user;
            return _context4.abrupt("return", res.redirect("/users/edit"));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.isGithub === true) {
    return res.redirect("/");
  }

  res.render("change-password", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPassword2, user, correct;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPassword2 = _req$body4.newPassword2;
            _context5.next = 3;
            return _User["default"].findById(_id);

          case 3:
            user = _context5.sent;
            _context5.next = 6;
            return _bcrypt["default"].compare(oldPassword, user.password);

          case 6:
            correct = _context5.sent;

            if (correct) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errMsg: "기존 비밀번호가 일치하지 않습니다."
            }));

          case 9:
            if (!(newPassword !== newPassword2)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errMsg: "새로운 비밀번호가 일치하지 않습니다."
            }));

          case 11:
            user.password = newPassword;
            _context5.next = 14;
            return user.save();

          case 14:
            return _context5.abrupt("return", res.redirect("/"));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var see = function see(req, res) {};

exports.see = see;