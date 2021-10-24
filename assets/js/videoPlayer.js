/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var videoContainer = document.querySelector(\"#videoContainer\");\nvar video = videoContainer.querySelector(\"video\");\nvar videoControls = videoContainer.querySelector(\"#videoControls\");\nvar play = videoContainer.querySelector(\"#play\");\nvar currenTime = videoContainer.querySelector(\"#currenTime\");\nvar totalTime = videoContainer.querySelector(\"#totalTime\");\nvar timeline = videoContainer.querySelector(\"#timeline\");\nvar volume = videoContainer.querySelector(\"#volume\");\nvar mute = videoContainer.querySelector(\"#mute\");\nvar fullScreen = videoContainer.querySelector(\"#fullScreen\");\nvar videoVolume = 0.5;\n\nvar handlePlay = function handlePlay() {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  var icon = play.querySelector(\"i\");\n  icon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\n\nvar handleMute = function handleMute() {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n    volume.value = 0;\n  }\n\n  volume.value = video.muted ? 0 : videoVolume;\n  var icon = mute.querySelector(\"i\");\n  icon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n};\n\nvar handleVolume = function handleVolume(e) {\n  var volume = e.target;\n  var icon = mute.querySelector(\"i\");\n\n  if (volume.value === \"0\") {\n    video.muted = true;\n  } else {\n    video.muted = false;\n  }\n\n  videoVolume = volume.value;\n  video.volume = videoVolume;\n  icon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n};\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = new Date(Math.floor(video.duration) * 1000).toISOString().substr(14, 5);\n  timeline.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currenTime.innerText = new Date(Math.floor(video.currentTime) * 1000).toISOString().substr(14, 5);\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handleTimeline = function handleTimeline() {\n  video.currentTime = timeline.value;\n};\n\nvar handleFullscreen = function handleFullscreen() {\n  if (document.fullscreenElement) {\n    document.exitFullscreen();\n  } else {\n    videoContainer.requestFullscreen();\n  }\n\n  var icon = fullScreen.querySelector(\"i\");\n  icon.classList = document.fullscreenElement ? \"fas fa-expand\" : \"fas fa-compress\";\n};\n\nvar init = function init() {\n  play.addEventListener(\"click\", handlePlay);\n  mute.addEventListener(\"click\", handleMute);\n  volume.addEventListener(\"input\", handleVolume);\n  video.addEventListener(\"loadedmetadata\", handleLoadedMetadata);\n  video.addEventListener(\"timeupdate\", handleTimeUpdate);\n\n  if (video.readyState >= 2) {\n    handleLoadedMetadata();\n    handleTimeUpdate();\n  }\n\n  timeline.addEventListener(\"input\", handleTimeline);\n  fullScreen.addEventListener(\"click\", handleFullscreen);\n};\n\nif (videoContainer) {\n  init();\n}\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;