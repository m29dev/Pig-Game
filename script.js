'use strict';

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const dicePng = document.querySelector('.dice');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let totalScore = [0, 0]; // position 0-player0, 1-player1
let currentScore = 0;
let activePlayer = 0; // 0-player0, 1-player1

let game = true;

function init() {
  game = true;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  dicePng.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}

init();

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

rollBtn.addEventListener('click', function () {
  if (game) {
    dicePng.classList.remove('hidden');
    // 1. generate random dice roll number
    let dice = Math.trunc(Math.random() * 6 + 1);
    // 2. display dice
    dicePng.src = `dice-${dice}.png`;
    // 3. check if it's 1 or something else
    if (dice !== 1) {
      // 1. add dice to current score
      currentScore += dice;
      // 2. display player score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (game) {
    // 1. add currentScore to the totalScore
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // 2. check if score is >=100 -> win else switchPlayer()
    if (totalScore[activePlayer] >= 20) {
      game = false;
      if (activePlayer === 0) {
        player0.classList.add('player--winner');
      } else {
        player1.classList.add('player--winner');
      }
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);