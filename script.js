'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const currentScore0EL = document.getElementById('current--0');
const currentScore1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let stillPlaying;

// Reset the game
const newGame = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = 1;
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  diceEL.classList.add('hidden');
};
newGame(); //executes once the loading the page

// Switch to next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active'); // toggle checks if class exists, remove it. else, add it
  player1EL.classList.toggle('player--active');
};

// Rolling dice
const rollDice = function () {
  if (stillPlaying) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //from 1 to 6

    // Display dice roll
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // Check if dice is 1, if true, switch to next player
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// Hold score
const hold = function () {
  if (stillPlaying) {
    // Add current score to total score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      stillPlaying = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

newGameBtn.addEventListener('click', newGame);
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
