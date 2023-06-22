let currentPlayer = 'X';
let gameOver = false;

function makeMove(cell) {
  if (gameOver) return;

  let cellElement = document.getElementById('cell-' + cell);
  if (cellElement.innerHTML !== '') return;

  cellElement.innerHTML = currentPlayer;
  checkWin();
  togglePlayer();
}

function togglePlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWin() {
  const cells = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  for (var i = 0; i < cells.length; i++) {
    let cell1 = document.getElementById('cell-' + cells[i][0]);
    let cell2 = document.getElementById('cell-' + cells[i][1]);
    let cell3 = document.getElementById('cell-' + cells[i][2]);

    if (cell1.innerHTML !== '' &&
        cell1.innerHTML === cell2.innerHTML &&
        cell1.innerHTML === cell3.innerHTML) {
      gameOver = true;
      cell1.style.backgroundColor = 'lightgreen';
      cell2.style.backgroundColor = 'lightgreen';
      cell3.style.backgroundColor = 'lightgreen';
      alert('Spieler ' + currentPlayer + ' hat gewonnen!');
      break;
    }
  }
}