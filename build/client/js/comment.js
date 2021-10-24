"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.querySelector("#videoContainer");
var commentForm = document.querySelector("#commentForm");
var deleteBtns = document.querySelectorAll("#deleteBtn");
var comments = document.querySelector("#comments");

var addComment = function addComment(text, id) {
  var videoComments = document.querySelector("#comments ul");
  var newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  var icon = document.createElement("i");
  icon.className = "fas fa-comment";
  var span = document.createElement("span");
  span.innerText = " ".concat(text);
  var span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var textarea, id, text, response, _yield$response$json, newComment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            textarea = commentForm.querySelector("textarea");
            id = videoContainer.dataset.id;
            text = textarea.value;
            _context.next = 6;
            return fetch("/api/videos/".concat(id, "/comment"), {
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text: text
              })
            });

          case 6:
            response = _context.sent;

            if (!(response.status === 201)) {
              _context.next = 14;
              break;
            }

            textarea.value = "";
            _context.next = 11;
            return response.json();

          case 11:
            _yield$response$json = _context.sent;
            newComment = _yield$response$json.newComment;
            addComment(text, newComment);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleDelete = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
    var comment, id, ul;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            comment = e.target.parentElement.parentElement;
            id = comment.dataset.id;
            _context2.next = 4;
            return fetch("/api/comments/".concat(id, "/delete"), {
              method: "delete"
            });

          case 4:
            ul = comments.querySelector("ul");
            ul.removeChild(comment);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

if (commentForm) {
  commentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach(function (deleteBtn) {
    return deleteBtn.addEventListener("click", handleDelete);
  });
}