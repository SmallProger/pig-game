'use strict';
//игроки
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//общий счёт игроков
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
//игральная кость
const dice = document.querySelector('.dice');
//кнопки
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
//текущий счёт игроков
const actualScore0 = document.querySelector('#current--0');
const actualScore1 = document.querySelector('#current--1');
score0.textContent = 0;
score1.textContent = 0;
let activePlayer;
let score;
let scores;
let playing;
let numberDice;

const init = function () {
  playing = true;
  numberDice = 0;
  activePlayer = 0;
  scores = [0, 0];
  score = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--winner');
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
};
init();
let changePlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  score = 0;
};
btnRollDice.addEventListener('click', function () {
  if (playing) {
    dice.classList.remove('hidden');
    numberDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${numberDice}.png`;
    if (numberDice !== 1) {
      score += numberDice;
      document.querySelector(`#current--${activePlayer}`).textContent = score;
    } else {
      changePlayer();
      score = 0;
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += score;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
  }
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    playing = false;
    dice.classList.add('hidden');
  } else {
    changePlayer();
  }
});
btnNewGame.addEventListener('click', init);
