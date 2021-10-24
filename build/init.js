"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/User");

require("./models/Video");

require("./models/Comment");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;

_server["default"].listen(PORT, function () {
  return console.log("[SERVER LISTENING] http://localhost:".concat(PORT));
});