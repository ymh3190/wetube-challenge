"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.querySelector("#videoContainer");
var video = videoContainer.querySelector("video");
var videoControls = videoContainer.querySelector("#videoControls");
var play = videoContainer.querySelector("#play");
var currenTime = videoContainer.querySelector("#currenTime");
var totalTime = videoContainer.querySelector("#totalTime");
var timeline = videoContainer.querySelector("#timeline");
var volume = videoContainer.querySelector("#volume");
var mute = videoContainer.querySelector("#mute");
var fullScreen = videoContainer.querySelector("#fullScreen");
var videoVolume = 0.5;
var removingTimer = null;
var showingTimer = null;

var handlePlay = function handlePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  var icon = play.querySelector("i");
  icon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

var handleMute = function handleMute() {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
    volume.value = 0;
  }

  volume.value = video.muted ? 0 : videoVolume;
  var icon = mute.querySelector("i");
  icon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
};

var handleVolume = function handleVolume(e) {
  var volume = e.target;
  var icon = mute.querySelector("i");

  if (volume.value === "0") {
    video.muted = true;
  } else {
    video.muted = false;
  }

  videoVolume = volume.value;
  video.volume = videoVolume;
  icon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
};

var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = new Date(Math.floor(video.duration) * 1000).toISOString().substr(14, 5);
  timeline.max = Math.floor(video.duration);
};

var handleTimeUpdate = function handleTimeUpdate() {
  currenTime.innerText = new Date(Math.floor(video.currentTime) * 1000).toISOString().substr(14, 5);
  timeline.value = Math.floor(video.currentTime);
};

var handleTimeline = function handleTimeline() {
  video.currentTime = timeline.value;
};

var handleFullscreen = function handleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }

  var icon = fullScreen.querySelector("i");
  icon.classList = document.fullscreenElement ? "fas fa-expand" : "fas fa-compress";
};

var addShowing = function addShowing() {
  return videoControls.classList.add("showing");
};

var removeShowing = function removeShowing() {
  return videoControls.classList.remove("showing");
};

var handleMouseMove = function handleMouseMove() {
  if (removingTimer) {
    clearTimeout(removingTimer);
  }

  videoControls.classList.add("showing");
  removingTimer = setTimeout(removeShowing, 3000);
};

var handleMouseLeave = function handleMouseLeave() {
  return removingTimer = setTimeout(removeShowing, 3000);
};

var handleEnded = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = videoContainer.dataset.id;
            _context.next = 3;
            return fetch("/api/videos/".concat(id, "/view"), {
              method: "post"
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleEnded() {
    return _ref.apply(this, arguments);
  };
}();

var init = function init() {
  play.addEventListener("click", handlePlay);
  mute.addEventListener("click", handleMute);
  volume.addEventListener("input", handleVolume);
  video.addEventListener("loadedmetadata", handleLoadedMetadata);
  video.addEventListener("timeupdate", handleTimeUpdate);

  if (video.readyState >= 2) {
    handleLoadedMetadata();
    handleTimeUpdate();
  }

  timeline.addEventListener("input", handleTimeline);
  fullScreen.addEventListener("click", handleFullscreen);
  videoContainer.addEventListener("mousemove", handleMouseMove);
  videoContainer.addEventListener("mouseleave", handleMouseLeave);
  video.addEventListener("ended", handleEnded);
};

if (videoContainer) {
  init();
}