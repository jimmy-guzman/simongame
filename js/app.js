const boxes = document.querySelectorAll(".box");
const startGameButton = document.getElementById("startGame");
const counter = document.querySelector(".counter p");

// const initSeq = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
const initSeq = [0, 1, 2];
let rSeq = [];
let count = 0;
let picks = [];
let pickCount = 0;
let isPlayerTurn = false;
let maxSteps = 1;

function randSeq() {
  return initSeq.map(org => Math.floor(Math.random() * Math.floor(4)));
}

function startSeq() {
  isPlayerTurn = false;
  setTimeout(function() {
    step(count);
    count++;
    updateCounter(count);
    if (count < maxSteps) startSeq();
    playerTurn();
  }, 1500);
}

function step(nextStep) {
  boxes[rSeq[nextStep]].classList.add("glow");
  playAudio(`sounds/sound${rSeq[nextStep] + 1}.wav`);
  isNext = false;
}

function playAudio(audioURL) {
  const audio = new Audio(audioURL);
  audio.play();
}

function simonTurn() {
  startSeq();
  // if (isPlayerTurn) playerTurn(maxSteps);
}

function playerTurn() {
  // console.log(pickCount, count, picks, maxSteps);
  if (count + 1 > maxSteps) {
    isPlayerTurn = true;
  }
}

function pick() {
  const boxesArr = Array.from(boxes);
  let index = 0;
  if (pickCount < count && isPlayerTurn) {
    index = boxesArr.indexOf(this);
    boxes[index].classList.add("glow");
    picks.push(boxesArr.indexOf(this));
  }

  checkIfCorrect(picks, index);
  // console.log("pick count: ", pickCount);
}

function checkIfCorrect(picks, index) {
  // console.log("picks: ", picks, rSeq[pickCount]);
  
  if (picks[pickCount] === rSeq[pickCount]) {
    pickCount++;
    console.log("correct");
    playAudio(`sounds/sound${index + 1}.wav`);
    if(maxSteps === rSeq.length && pickCount === rSeq.length) {
      playAudio("sounds/applause.wav");
      playAudio(audioURL);
      isPlayerTurn = false;
    }
    else if(pickCount === maxSteps) {
      pickCount = 0;
      console.log("next round");
      count = 0;
      picks.length = 0;
      maxSteps++;
      simonTurn();
    }
  } else {
    pickCount = 0;
    playAudio("sounds/error.wav");
    count = 0;
    picks.length = 0;
    simonTurn();
  }
}

function startGame() {
  rSeq = randSeq();
  console.log(rSeq);
  pickCount = 0;
  count = 0;
  picks.length = 0;
  maxSteps = 1;
  simonTurn();
}

function removeTransition(e) {
  if (e.propertyName !== "opacity") return;
  this.classList.remove("glow");
}

function updateCounter(steps) {
  counter.textContent = steps;
}

boxes.forEach(box => box.addEventListener("click", pick));
boxes.forEach(box => box.addEventListener("transitionend", removeTransition));
startGameButton.addEventListener("click", startGame);