"use strickt";

//global varibales
let intervalPeriod = 25;
let breakPeriod = 5;
let totalTime = 120;
let passedTime = 0;
let completedPoms = 0;
var timerState = {
  timer: null,
  time: 0,
  type: null,
};

//dom elements
const typeHeader = document.querySelector("#type");
const watch = document.querySelector(".watch");
const pauseBtn = document.querySelector("#btn-pause");
const stopBtn = document.querySelector("#btn-stop");
const startBtn = document.querySelector("#btn-start");
const completedPomsLbl = document.querySelector("#completed");
const passedTimeLbl = document.querySelector("#passed");
const remainTimeLbl = document.querySelector("#remaining");
const intervalPeriodInput = document.querySelector("#inpt-Interval");
const breakPeriodInput = document.querySelector("#inpt-break");
const totalTimeInput = document.querySelector("#inpt-total");
const saveBtn = document.querySelector(".btn-save");

const startInterval = function () {
  //update buttons ui
  toggleCntrlButtons();
  typeHeader.textContent = "Interval";

  //update state
  if (timerState.type != "paused") {
    timerState.time = intervalPeriod * 60;
  }
  timerState.type = "interval";

  //stopping current timeres
  stopTime();

  //start counting time
  startTime();
};

const startbreak = function () {
  //update buttons ui
  toggleCntrlButtons();
  typeHeader.textContent = "Break!";
  //update state
  timerState.type = "break";
  timerState.time = breakPeriod * 60;

  //start counting time
  startTime();
};

const startTime = function () {
  timerState.timer = setInterval(function () {
    //calculating time
    const hours = Math.trunc(timerState.time / (60 * 60));
    const minutes = Math.trunc(timerState.time / 60 - hours * 60);
    const seconds = timerState.time - (hours * 60 * 60 + minutes * 60);

    //updating ui
    watch.textContent = `${String(hours).padStart(2, 0)}:${String(
      minutes
    ).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;

    //updating time
    timerState.time--;

    checkTimeIsEnded();
  }, 1000);
};

const checkTimeIsEnded = function () {
  if (timerState.time === 0) {
    stopTime();

    updateState();

    if (timerState.type == "interval") startInterval();
    else startbreak();
  }
};

const updateState = function () {
  if (timerState.type == "interval") {
    completedPoms += 1;
    completedPomsLbl.textContent = completedPoms;

    passedTime += intervalPeriod;
    passedTimeLbl.textContent = (passedTime / 60).toFixed(2) + "Hour";

    remainTimeLbl.textContent =
      ((totalTime - passedTime) / 60).toFixed(2) + "Hour";

    if (passedTime >= totalTime) {
      typeHeader.textContent = "You're done for today!!";
      passedTime = 0;
    }

    timerState.type = "break";
  } else {
    timerState.type = "interval";
  }
};

const stopTime = function () {
  clearInterval(timerState.timer);
};

const pauseTime = function () {
  stopTime();

  toggleCntrlButtons();
  typeHeader.textContent = "Paused";

  timerState.type = "paused";
};

const stopCurTime = function () {
  stopTime();

  toggleCntrlButtons();
  typeHeader.textContent = "Press to start again";
  watch.textContent = "00:00:00";
  timerState.type = null;
};

startBtn.addEventListener("click", startInterval);
pauseBtn.addEventListener("click", pauseTime);
stopBtn.addEventListener("click", stopCurTime);
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  intervalPeriod = Number(intervalPeriodInput.value) || intervalPeriod;
  breakPeriod = Number(breakPeriodInput.value) || breakPeriod;
  totalTime = Number(totalTimeInput.value * 60) || totalTime;
  alert("Your configurations have been saved");
});

const toggleCntrlButtons = function () {
  startBtn.classList.toggle("btn-hidden");
  pauseBtn.classList.toggle("btn-hidden");
  stopBtn.classList.toggle("btn-hidden");
};
