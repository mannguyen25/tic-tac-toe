const Board = (cells) => {
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

export default Board;