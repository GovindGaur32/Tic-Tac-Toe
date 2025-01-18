const board = document.querySelector('.board');
const playerXInput = document.getElementById('playerXName');
const playerOInput = document.getElementById('playerOName');
const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
const winnerModal = document.getElementById('winnerModal');
const winnerName = document.getElementById('winnerName');
const balloonsContainer = document.querySelector('.balloons');
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let currentPlayer = PLAYER_X;
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);
let playerXName = 'Player X';
let playerOName = 'Player O';

playerXInput.addEventListener('input', (e) => {
  playerXName = e.target.value || 'Player X';
  updateCurrentPlayerDisplay();
});

playerOInput.addEventListener('input', (e) => {
  playerOName = e.target.value || 'Player O';
  updateCurrentPlayerDisplay();
});

function checkWinner() {
  for (let condition of WINNING_CONDITIONS) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      highlightWinningCells(condition);
      return cells[a];
    }
  }
  return null;
}

function highlightWinningCells(condition) {
  condition.forEach(index => {
    document.querySelectorAll('.cell')[index].classList.add('winning-cell');
  });
}

function handleCellClick(index) {
  if (winner || cells[index]) return;

  cells[index] = currentPlayer;
  render();

  winner = checkWinner();

  if (winner) {
    setTimeout(() => {
      showWinnerModal(winner === PLAYER_X ? playerXName : playerOName);
    }, 100);
  } else if (!cells.includes(null)) {
    setTimeout(() => {
      alert("It's a tie!");
      resetGame();
    }, 100);
  } else {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    updateCurrentPlayerDisplay();
  }
}

function render() {
  board.innerHTML = '';
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value || '';
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
  });
}

function resetGame() {
  cells.fill(null);
  currentPlayer = PLAYER_X;
  winner = null;
  updateCurrentPlayerDisplay();
  render();
}

function updateCurrentPlayerDisplay() {
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer === PLAYER_X ? playerXName : playerOName}`;
}

function showWinnerModal(winner) {
  winnerName.textContent = winner;
  winnerModal.style.display = 'flex';
  createBalloons();
  setTimeout(() => {
    winnerModal.style.display = 'none';
    removeBalloons();
    resetGame();
  }, 3000);
}

function createBalloons() {
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloonsContainer.appendChild(balloon);
  }
}

function removeBalloons() {
  balloonsContainer.innerHTML = '';
}

// Initial render
updateCurrentPlayerDisplay();
render();