let userSeq = [];
let gameSeq = [];

function select(string) {
  return document.querySelector(string);
}

function selectAll(string) {
  return document.querySelectorAll(string);
}

let started = false;

document.addEventListener('keydown', function () {
  if (started === false) {
    levelUp();
    started = true;
  }
});

let level = 0;
const infoEl = select('.info');

function levelUp() {
  userSeq = [];
  level++;
  infoEl.innerText = `Level - ${level}`;
  const randomColor = getRandomColor();
  const box = select('.'+randomColor)
  Flash(box);
  gameSeq.push(randomColor);
  console.log(gameSeq);
}

function getRandomColor() {
  const boxArray = ['green', 'red', 'yellow', 'blue'];
  return boxArray[Math.floor(Math.random() * 4)];
}

function Flash(box) {
  box.classList.add('flash');
  setTimeout(() => {
    box.classList.remove('flash');
  }, 150);
}

const boxes = selectAll('.box')

boxes.forEach(box => {
  box.addEventListener('click', function () {
    Flash(box);
    userSeq.push(box.classList[1]);
    console.log(userSeq);
    checkSeq();
  })
});

let highscore = 0;

function checkSeq() {
  if (userSeq[userSeq.length - 1] == gameSeq[userSeq.length - 1]) {
    if (userSeq.length == gameSeq.length) {
      boxes.forEach(box => {
        box.style.pointerEvents = 'none';
      });
      setTimeout(() => {
        levelUp();
        boxes.forEach(box => {
          box.style.pointerEvents = 'all';
        });
      }, 1000);
    }
  }
  else {
    infoEl.innerText = `Your Score was ${level-1}. Press any key to restart`;
    const highScoreEl = select('.highscore');
    if (level-1 > highscore) {
      highscore = level-1;
      highScoreEl.innerText = `Highscore - ${highscore}`;
    }
    reset();
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}