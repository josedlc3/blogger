const e = require("express");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

let currentGame = null;

module.exports.createGame = async function(req, res) {

    const { gameStarter } = req.body;

    if(!currentGame) {
        currentGame = {
            grid: new Array(9).fill(null), 
            currentPlayer: 'X',
            winner: null, 
            activeGame: true,
            playerLeft: false,
            gameStarter: gameStarter
        };
        sendJsonResponse(res, 201, currentGame);
    } else {
        sendJsonResponse(res, 400, {error: 'A game is already in progress'});
    }
};

module.exports.getGame = async function(req, res) {
    if (currentGame) {
        sendJsonResponse(res, 200, currentGame);
    } else {
        sendJsonResponse(res, 400, {error: 'No game in progress'});
    }
};

module.exports.makeMove = async function(req, res) {
    // Parse request data
    const { row, col } = req.body;

    // Validate move
    if (!isValidMove(row, col)) {
        return sendJsonResponse(res, 400, { message: 'Invalid move' });
    }

    // Update game state
    currentGame.grid[row * 3 + col] = currentGame.currentPlayer;

    // Check for win or draw
    checkWin();

    if (currentGame.winner) {
        return sendJsonResponse(res, 200, currentGame.winner);
    } else if (currentGame.grid.every(cell => cell !== null)) {
        currentGame.winner = 'Draw';
        return sendJsonResponse(res, 200, currentGame.currentPlayer);
    }

    // Toggle current player
    currentGame.currentPlayer = (currentGame.currentPlayer === 'X') ? 'O' : 'X';

    // Send response
    sendJsonResponse(res, 200, currentGame.currentPlayer);
};

function isValidMove(row, col) {
    return currentGame.grid[row * 3 + col] === null && !currentGame.winner;
}

// Helper function to check for a win or draw
function checkWin() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (currentGame.grid[a] && currentGame.grid[a] === currentGame.grid[b] && currentGame.grid[a] === currentGame.grid[c]) {
            currentGame.winner = currentGame.grid[a];
            return;
        }
    }
}

module.exports.deleteGame = async function(req, res) {
    currentGame = null; 
    sendJsonResponse(res, 200, currentGame);
};