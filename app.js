const playBt = document.querySelector("#play");
const backwardBt = document.querySelector("#backwardbt");
const forwardBt = document.querySelector("#forward");
const audio = document.querySelector("audio");
const container = document.querySelector(".container");
const progresscontainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const volumeChanger = document.querySelector("#volume-Changer");

audio.volume = +volumeChanger.value / 100;

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBt.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function play() {
  audio.play();
  container.classList.add("play");
  playBt.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function muscplay() {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function progress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  const p = (currentTime / duration) * 100;
  progressEl.style.width = `${p}%`;
}
function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}
playBt.addEventListener("click", muscplay);
audio.addEventListener("timeupdate", progress);
progresscontainer.addEventListener("click", changeTime);
volumeChanger.addEventListener("input ", () => {
  audio.volume = +volumeChanger.value / 100;
});
