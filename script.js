document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const turnDisplay = document.getElementById('turn');
    const winnerScreen = document.getElementById('winner-screen');
    const drawScreen = document.getElementById('draw-screen');
    const winnerMessage = document.getElementById('winner-message');
    const playAgainButton = document.getElementById('play-again');
    const playAgainDrawButton = document.getElementById('play-again-draw');

    let currentPlayer = 'X';
    let gameEnded = false;

    // Initialize the game
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);
    playAgainButton.addEventListener('click', resetGame);
    playAgainDrawButton.addEventListener('click', resetGame);

    function handleCellClick() {
        if (!gameEnded && this.textContent === '') {
            this.textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                showWinnerScreen(currentPlayer);
                gameEnded = true;
            } else if (checkDraw()) {
                showDrawScreen();
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => cells[index].textContent === player);
        });
    }

    function checkDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        gameEnded = false;
        currentPlayer = 'X';
        turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
        winnerScreen.style.display = 'none';
        drawScreen.style.display = 'none';
    }

    function showWinnerScreen(player) {
        winnerMessage.textContent = `Player ${player} wins!`;
        winnerScreen.style.display = 'flex';
    }

    function showDrawScreen() {
        drawScreen.style.display = 'flex';
    }
});