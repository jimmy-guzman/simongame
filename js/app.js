const boxes = document.querySelectorAll(".box");
const startGameButton = document.getElementById("startGame");
const counter = document.querySelector(".counter p");

const initSeq = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
let count = 0;
let picks = [];
let pickCount = 0;

function randSeq() {
  return initSeq.map(org => Math.floor(Math.random() * Math.floor(4)));
}

function startSeq(seq, upTo) {
  setTimeout(function() {
    step(seq, count);
    count++;
    updateCounter(count);
    if (count < upTo) startSeq(seq, upTo);
  }, 1500);
}

function step(seq, nextStep) {
  console.log(nextStep);
  boxes[seq[nextStep]].classList.add("glow");
  let audioURL = `sounds/sound${seq[nextStep] + 1}.wav`;
  playAudio(audioURL);
  isNext = false;
}

function playAudio(audioURL) {
  const audio = new Audio(audioURL);
  audio.play();
}

function simonTurn(seq) {
  startSeq(seq, 0);
  playerTurn();
}

function playerTurn() {
  boxes.forEach(box => box.addEventListener("click", pick));
}

function pick() {
  const boxesArr = Array.from(boxes);
  if(pickCount < count) {
    const index = boxesArr.indexOf(this);
    boxes[index].classList.add("glow");
    let audioURL = `sounds/sound${index + 1}.wav`;
    playAudio(audioURL);
    picks.push(boxesArr.indexOf(this));
    console.log(picks);
  }
  pickCount++;
}

function startGame() {
  const seq = randSeq();
  console.log(seq);
  simonTurn(seq);
}

function removeTransition(e) {
  if (e.propertyName !== "opacity") return;
  this.classList.remove("glow");
}

function updateCounter(steps) {
  counter.textContent = steps;
}

boxes.forEach(box => box.addEventListener("transitionend", removeTransition));
startGameButton.addEventListener("click", startGame);
