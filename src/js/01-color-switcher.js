function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

let colorChangeId = null;

startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", "true");
  colorChangeId = setInterval(() => {
    const bgColor = getRandomHexColor();
    document.body.style.backgroundColor = bgColor;
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(colorChangeId);
  startBtn.removeAttribute("disabled");
});
