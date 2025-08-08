const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const container = document.querySelector(".container");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (gameState[clickedIndex] !== "" || !gameActive) return;

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add("played");

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    showResult(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    showResult("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function showResult(message) {
  container.style.display = "none";
  resultScreen.style.display = "flex";
  resultMessage.textContent = message;
}

function newGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("played");
  });
  container.style.display = "flex";
  resultScreen.style.display = "none";
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-cell-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

createBoard();
