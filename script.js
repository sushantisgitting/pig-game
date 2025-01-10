'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
let current0EL = document.getElementById('current--0');
let current1EL = document.getElementById('current--1');
//Selecting Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Score = 0
  activePlayer = activePlayer === 0 ? 1 : 0; // If 0 is active, switch to 1 and vice versa
  currentScore = 0; // Current Score goes to 0 after switching
  player0El.classList.toggle('player--active'); // Toggling from one to another
  player1El.classList.toggle('player--active');
};
// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Remove the hidden dice
    diceEl.classList.remove('hidden');
    // Manipulate the source using template literals to show rolled dice image
    diceEl.src = `dice-${dice}.png`;
    //Check for 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if 1 is rolled - switch player
      switchPlayer();
    }
  }
});
//Holding Score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add Current Score to Player Score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check for 100 Score
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Switch the Player after holding
    switchPlayer();
  }
});
// Resetting the game
btnNew.addEventListener('click', function () {
  location.reload();
});
