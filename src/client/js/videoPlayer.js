const videoContainer = document.querySelector("#videoContainer");
const video = videoContainer.querySelector("video");
const videoControls = videoContainer.querySelector("#videoControls");
const play = videoContainer.querySelector("#play");
const currenTime = videoContainer.querySelector("#currenTime");
const totalTime = videoContainer.querySelector("#totalTime");
const timeline = videoContainer.querySelector("#timeline");
const volume = videoContainer.querySelector("#volume");
const mute = videoContainer.querySelector("#mute");
const fullScreen = videoContainer.querySelector("#fullScreen");

let videoVolume = 0.5;
let removingTimer = null;
let showingTimer = null;

const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  const icon = play.querySelector("i");
  icon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
    volume.value = 0;
  }
  volume.value = video.muted ? 0 : videoVolume;
  const icon = mute.querySelector("i");
  icon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
};

const handleVolume = (e) => {
  const { target: volume } = e;
  const icon = mute.querySelector("i");
  if (volume.value === "0") {
    video.muted = true;
  } else {
    video.muted = false;
  }
  videoVolume = volume.value;
  video.volume = videoVolume;
  icon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
};

const handleLoadedMetadata = () => {
  totalTime.innerText = new Date(Math.floor(video.duration) * 1000)
    .toISOString()
    .substr(14, 5);
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = new Date(Math.floor(video.currentTime) * 1000)
    .toISOString()
    .substr(14, 5);
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeline = () => {
  video.currentTime = timeline.value;
};

const handleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
  const icon = fullScreen.querySelector("i");
  icon.classList = document.fullscreenElement
    ? "fas fa-expand"
    : "fas fa-compress";
};

const addShowing = () => videoControls.classList.add("showing");
const removeShowing = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (removingTimer) {
    clearTimeout(removingTimer);
  }
  videoControls.classList.add("showing");
  removingTimer = setTimeout(removeShowing, 3000);
};

const handleMouseLeave = () =>
  (removingTimer = setTimeout(removeShowing, 3000));

const handleEnded = async () => {
  const {
    dataset: { id },
  } = videoContainer;
  await fetch(`/api/videos/${id}/view`, {
    method: "post",
  });
};

const init = () => {
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
