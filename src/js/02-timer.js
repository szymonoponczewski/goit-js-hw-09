import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");

const startBtn = document.querySelector("button[data-start]");
const inputEl = document.getElementById("datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();
    if (pickedDate < Date.parse(options.defaultDate)) {
      window.alert("Please choose a date in the future");
      startBtn.setAttribute("disabled", "");
    } else {
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(inputEl, options);
// startBtn.addEventListener("click", () => {});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
