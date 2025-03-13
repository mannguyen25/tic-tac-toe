const cells = [...document.getElementsByClassName("cell")];
const Board = () => {
    const isBoardFull = () => {
        return cells.every(cell => cell.textContent!== "");
    }
    const hasWinner = () => {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            // checks rows
            if (cells[i * 3].textContent !== '' && cells[i * 3].textContent === cells[i * 3 + 1].textContent && cells[i * 3].textContent === cells[i * 3 + 2].textContent) {
                return true;
            }
            // checks columns
            if (cells[i].textContent !== '' & cells[i].textContent === cells[i + 3].textContent && cells[i].textContent === cells[i + 6].textContent) {
                return true;
            }
        }
        // checks diagonals
        if (cells[0].textContent !== '' && cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent) {
            return true;
        }
        if (cells[2].textContent !== '' && cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent) {
            return true;
        }
        return false;
    }
    const placeMarker = (cellNum, symbol) => {
        if (cells[cellNum].textContent === "") {
            cells[cellNum].textContent = symbol;
            return true;
        }
        return false;
    }
    const clearBoard = () => {
        cells.forEach(cell => cell.textContent = "");
    }
    return {isBoardFull, hasWinner, placeMarker, clearBoard}
};

const Player = (name, symbol) => {
    return {name, symbol}
};

const Game = (player1, player2, board) =>{
    const players = [player1, player2]
    let activePlayer = players[Math.floor(Math.random() * 2)]
    const resetbtn = document.getElementById("reset");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener('click', () => {
        modal.close();
    });
    const switchPlayer = () => {
        // switch player
        activePlayer = players[(players.indexOf(activePlayer) + 1) % 2]
        document.getElementById("current-player-info").textContent = `Current Player: ${activePlayer.name}`;
    }
    cells.forEach((cell) => {
        cell.addEventListener("click", (event) => {
        board.placeMarker(event.target.id.split("-")[1], activePlayer.symbol);
        if (board.hasWinner()) {
            modal.children[0].children[1].textContent = `Winner: ${activePlayer.name}`;
            modal.showModal();
        }
        else if (board.isBoardFull()) {
            modal.children[0].children[1].textContent = "It's a draw!";
            modal.showModal();
        }
        switchPlayer();
        });
    });
    const resetGame = () => {
        activePlayer = players[Math.floor(Math.random() * 2)];
        document.getElementById("current-player-info").textContent = `Current Player: ${activePlayer.name}`;
        board.clearBoard();
    }
    resetbtn.addEventListener("click", resetGame);
}

const TicTacToe = (()=> {
    const player1 = Player("Player 1","X");
    document.getElementById("player-1").textContent = player1.name;
    const player2 = Player("Player 2","O");
    document.getElementById("player-2").textContent = player2.name;
    const board = Board();
    const game = Game(player1, player2, board);
})();
