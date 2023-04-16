import Notiflix from "notiflix";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");

const startBtn = document.querySelector("button[data-start]");
const inputEl = document.getElementById("datetime-picker");
const daysValue = document.querySelector("span[data-days]");
const hoursValue = document.querySelector("span[data-hours]");
const minutesValue = document.querySelector("span[data-minutes]");
const secondsValue = document.querySelector("span[data-seconds]");
const timerEl = document.querySelector(".timer");

let pickedDate = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();

    if (pickedDate < options.defaultDate) {
      Notiflix.Notify.warning("Please choose a date in the future");
      startBtn.setAttribute("disabled", "true");
    } else {
      startBtn.removeAttribute("disabled");
    }
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, "0");
  } else {
    return value.toString();
  }
}

function updateCountdown() {
  const currentDate = new Date().getTime();
  const countdown = pickedDate - currentDate;

  if (countdown < 0) {
    clearInterval(timerId);
    daysValue.textContent = "00";
    hoursValue.textContent = "00";
    minutesValue.textContent = "00";
    secondsValue.textContent = "00";
    timerEl.style.backgroundColor = "#F00";
    Notiflix.Notify.info("Time's up!");
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(countdown);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener("click", () => {
  timerEl.style.backgroundColor = "#0F0";
  timerId = setInterval(() => {
    updateCountdown();
  }, 1000);
});
