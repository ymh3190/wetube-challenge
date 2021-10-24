"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoSchema = new _mongoose["default"].Schema({
  fileUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  views: {
    type: Number,
    "default": 0,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment",
    required: true
  }]
});

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;