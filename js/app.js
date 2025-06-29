const playBt = document.querySelector("#play");
const backwardBt = document.querySelector("#backward");
const forwardBt = document.querySelector("#forward");
const audio = document.querySelector("audio");

const container = document.querySelector(".container");
const progresscontainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const volumeChanger = document.querySelector("#volume-Changer");
audio.volume = +volumeChanger.value / 100;
const cover = document.getElementById("cover");
const musictitle = document.getElementById("music-title");
const durationEl = document.getElementById("duration");
const currenttimeEl = document.getElementById("current - time");
const muteBtn = document.getElementById("muteBtn");
const laycBtn = document.getElementById("layc");
const icon = laycBtn.querySelector("i");
const speedButtons = document.querySelectorAll(".speed-buttons button");
const video = document.querySelector("video");

audio.addEventListener("loadeddata", () => {
  const duration = audio.duration;
  const minutes = String((duration - (duration % 60)) / 60);
  const seconds = String(parseInt(duration % 60));
  let time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}
  :${+minutes < 10 ? `${seconds.padStart(2, 0)}` : seconds}`;
  durationEl.textContent = time;
});

audio.addEventListener("loadedmetadata", () => {
  const duration = audio.duration;
  const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
  const seconds = String(Math.floor(duration % 60)).padStart(2, "0");
  durationEl.textContent = `${minutes}:${seconds}`;
});

const songs = [
  "J.Y. Park - When We Disco",
  "Kim BumSoo - I Miss You ",
  "어쩌다 마주친 그대 - 미도와 파라솔 ",
];

let currentPlayingSong = 1;

function changeSong(current) {
  audio.src = `../audios/${songs[current]}.mp3`;
  container.style.backgroundImage = `url('../imgs/${songs[current]}.jpg')`;
  container.src = `../videos/${songs[current]}.mp4`;
  icon.style.color = `../css/ ${songs[current]}.color`;
  musictitle.textContent = songs[current];
  icon.classList.remove("fa-solid");
  icon.classList.add("fa-regular");
  laycBtn.classList.remove("liked");
}

changeSong(currentPlayingSong);

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

function nextSong() {
  if (currentPlayingSong < songs.length - 1) {
    currentPlayingSong++;
  } else {
    currentPlayingSong = 0;
  }
  changeSong(currentPlayingSong);
  play();
}

function preevSong() {
  if (currentPlayingSong > 0) {
    currentPlayingSong--;
  } else {
    currentPlayingSong = songs.length - 1;
  }
  changeSong(currentPlayingSong);
  play();
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

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
  currenttimeEl.textContent = `${minutes}:${seconds}`;

  const p = (currentTime / duration) * 100;
  progressEl.style.width = `${p}%`;
}

// function progress() {
//   const duration = audio.duration;
//   const currentTime = audio.currentTime;

//   const decresingTime = isNaN(duration + currentTime)
//     ? 0
//     : duration - currentTime;

//   const minutes = String((decresingTime - (decresingTime % 60)) / 60);
//   const seconds = String(parseInt(decresingTime % 60));
//   let time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}
//   :${+minutes < 10 ? `${seconds.padStart(2, 0)}` : seconds}`;
//   currenttimeEl.textContent = time;

//   const p = (currentTime / duration) * 100;
//   progressEl.style.width = `${p}%`;
// }

function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}

function volumechanger() {
  audio.volume = +volumeChanger.value / 100;
  volumeEl.textContent = +volumeChanger / value;
  if (audio.volume === 0) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

let lastVolume = audio.volume;

muteBtn.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeChanger.value = 0;
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    audio.volume = lastVolume;
    volumeChanger.value = lastVolume * 100;
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
});

laycBtn.addEventListener("click", () => {
  laycBtn.classList.toggle("liked");

  if (laycBtn.classList.contains("liked")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }
});

playBt.addEventListener("click", muscplay);
audio.addEventListener("timeupdate", progress);
progresscontainer.addEventListener("click", changeTime);
// volumeChanger.addEventListener("input", volumeChanger);
volumeChanger.addEventListener("input", volumechanger);
audio.addEventListener("ended", nextSong);
backwardBt.addEventListener("click", preevSong);
forwardBt.addEventListener("click", nextSong);
