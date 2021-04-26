buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 1;
let started = false;

/** Flashes the square that the user has clicked */
function userClick() {
  this.classList.add("pressed");
  setTimeout(() => this.classList.remove("pressed"), 100);
  userClickedPattern.push(this.id);
  let el = userClickedPattern.length - 1;
  if (userClickedPattern[el] !== gamePattern[el]) {
    endGame();
  } // with the else if why we use the "userClickedPattern" for defoult?
  else if (el === gamePattern.length - 1) {
    userClickedPattern = [];
    setTimeout(() => selectrandomColor(), 400);
  }
}

/** Selects a random color and lights it */
function selectrandomColor() {
  document.querySelector("h1").innerText = `Level ${level}`;
  const buttonIndex = Math.floor(Math.random() * 4); // 0 - 3
  const button = document.getElementById(buttonColours[buttonIndex]);
  button.classList.add("lighted");
  setTimeout(() => button.classList.remove("lighted"), 300);
  gamePattern.push(buttonColours[buttonIndex]);
  level += 1;
}

function startGame() {
  // want to understand booleans again deeply?
  started = true;
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < 4; i++) {
    buttons[i].addEventListener("click", userClick);
  }
  selectrandomColor();
}
// Especially I want to understand "event", also function("Inside")?
document.addEventListener("keypress", function (event) {
  if (!started) startGame();
});

function endGame() {
  document.querySelector("h1").innerText = "Game Over";
  resetGame();
}

function resetGame() {
  started = false;
  level = 1;
  setTimeout(
    () => (document.querySelector("h1").innerText = "Press A key to start"),
    1000
  );
  document
    .querySelectorAll(".btn")
    .forEach((btn) => btn.removeEventListener("click", userClick));
  userClickedPattern = [];
  gamePattern = [];
}
