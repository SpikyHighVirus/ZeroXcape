const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent || gameOver) return;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  winPatterns.forEach(pattern => {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add('winning-cell');
      cells[b].classList.add('winning-cell');
      cells[c].classList.add('winning-cell');
      document.querySelector('.message').innerHTML = `<div class="victory">🎉 ${cells[a].textContent} Wins! 🎉</div>`;
      gameOver = true;
    }
  });
}

restartButton.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winning-cell');
  });
  document.querySelector('.message').textContent = '';
  currentPlayer = 'X';
  gameOver = false;
});
