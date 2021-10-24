"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.search = exports.registerView = exports.postUpload = exports.postEdit = exports.index = exports.getUpload = exports.getEdit = exports.deleteVideo = exports.deleteComment = exports.addComment = void 0;

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var index = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Video["default"].find({});

          case 2:
            videos = _context.sent;
            res.render("index", {
              pageTitle: "",
              videos: videos
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.index = index;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var query, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = req.query.query;
            videos = [];

            if (!query) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: new RegExp(query, "i")
              }
            });

          case 5:
            videos = _context2.sent;

          case 6:
            return _context2.abrupt("return", res.render("search", {
              pageTitle: "Search",
              videos: videos
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.search = search;

var watch = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var video;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Video["default"].findById(req.params.id).populate("owner").populate("comments");

          case 2:
            video = _context3.sent;
            console.log(video.comments);
            return _context3.abrupt("return", res.render("watch", {
              pageTitle: "Watch",
              video: video
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function watch(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.watch = watch;

var getEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context4.sent;
            return _context4.abrupt("return", res.render("edit-video", {
              pageTitle: "Edit Video",
              video: video
            }));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(400).render("edit-video", {
              pageTitle: "Edit Video",
              errMsg: _context4.t0._message
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function getEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _req$body, title, description, exist;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id, _req$body = req.body, title = _req$body.title, description = _req$body.description;
            _context5.next = 3;
            return _Video["default"].exists({
              id: id
            });

          case 3:
            exist = _context5.sent;

            if (exist) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("edit-video", {
              pageTitle: "Edit Video",
              errMsg: err._message
            }));

          case 6:
            _context5.prev = 6;
            _context5.next = 9;
            return _Video["default"].findByIdAndUpdate(id, {
              title: title,
              description: description
            });

          case 9:
            return _context5.abrupt("return", res.redirect("/videos/".concat(id)));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](6);
            return _context5.abrupt("return", res.status(400).render("edit-video", {
              pageTitle: "Edit Video",
              errMsg: _context5.t0._message
            }));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 12]]);
  }));

  return function postEdit(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var deleteVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, exist;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return _Video["default"].exists({
              id: id
            });

          case 3:
            exist = _context6.sent;

            if (exist) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("edit-video", {
              pageTitle: "Edit Video",
              errMsg: "비디오 존재하지 않습니다."
            }));

          case 6:
            _context6.prev = 6;
            _context6.next = 9;
            return _Video["default"].findByIdAndDelete(id);

          case 9:
            return _context6.abrupt("return", res.redirect("/"));

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](6);
            return _context6.abrupt("return", res.status(400).render("edit-video", {
              pageTitle: "Edit Video",
              errMsg: _context6.t0._message
            }));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 12]]);
  }));

  return function deleteVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var file, _req$body2, title, description, _id;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            file = req.file, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, _id = req.session.user._id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].create({
              title: title,
              description: description,
              fileUrl: file.path,
              owner: _id
            });

          case 4:
            return _context7.abrupt("return", res.redirect("/"));

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](1);
            return _context7.abrupt("return", res.status(400).render("upload", {
              pageTitle: "Upload",
              errMsg: _context7.t0._message
            }));

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 7]]);
  }));

  return function postUpload(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.next = 3;
            return _Video["default"].findById(id);

          case 3:
            video = _context8.sent;

            if (video) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(400));

          case 6:
            video.views += 1;
            _context8.next = 9;
            return video.save();

          case 9:
            return _context8.abrupt("return", res.status(200));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.registerView = registerView;

var addComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, text, user, video, comment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, text = req.body.text, user = req.session.user;
            _context9.next = 3;
            return _Video["default"].findById(id);

          case 3:
            video = _context9.sent;

            if (video) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", res.status(400));

          case 6:
            _context9.next = 8;
            return _Comment["default"].create({
              text: text,
              owner: user._id,
              video: id
            });

          case 8:
            comment = _context9.sent;
            video.comments.push(comment._id);
            _context9.next = 12;
            return video.save();

          case 12:
            return _context9.abrupt("return", res.status(201).json({
              newCommentId: comment._id
            }));

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function addComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.addComment = addComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _context10.next = 3;
            return _Comment["default"].findByIdAndRemove({
              _id: id
            });

          case 3:
            return _context10.abrupt("return", res.end());

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function deleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;