var currentPlayer = 'X';
var gameOver = false;

function makeMove(cell) {
  if (gameOver) return;

  var cellElement = document.getElementById('cell-' + cell);
  if (cellElement.innerHTML !== '') return;

  cellElement.innerHTML = currentPlayer;
  checkWin();
  togglePlayer();
}

function togglePlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWin() {
  var cells = [
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
    var cell1 = document.getElementById('cell-' + cells[i][0]);
    var cell2 = document.getElementById('cell-' + cells[i][1]);
    var cell3 = document.getElementById('cell-' + cells[i][2]);

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