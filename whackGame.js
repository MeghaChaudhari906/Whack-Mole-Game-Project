const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const button = document.querySelector("#start");

let lastHole;
let timeUp = false;
let score = 0;

// Generate a random time between min and max
function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Choose a random hole, avoiding the last one
function randomHole(holes) {
  let index;
  do {
    index = Math.floor(Math.random() * holes.length);
  } while (holes[index] === lastHole);
  lastHole = holes[index];
  return lastHole;
}

// Make the mole "peep" out
function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

// Start the game
function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  button.style.visibility = "hidden";

  peep();

  setTimeout(() => {
    timeUp = true;
    button.innerText = "Play Again";
    button.style.visibility = "visible";
  }, 10000); // Run game for 10 seconds
}

// Handle mole click ("bonk")
function bonk(e) {
  if (!e.isTrusted) return; // Prevent fake clicks
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

// Attach click handler to each mole
moles.forEach(mole => mole.addEventListener("click", bonk));

// Attach click handler to start button
button.addEventListener("click", startGame);
