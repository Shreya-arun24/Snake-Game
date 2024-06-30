// IDEA OF THE GAME

// We can represent the game board as an 18x18 matrix starting with index 0.
// To mark an element on the matrix, we can say board[row][column].
// For example, the cell at the 14th row and 3rd column can be accessed as board[13][2].

// The food can be placed at any random position on the board.
// For example, placing the food at board[13][2] means the food is at the 14th row and the 3rd column.

// The snake can move in four directions:
// UP: Decrease the row index (move along the negative y-axis).
// DOWN: Increase the row index (move along the positive y-axis).
// LEFT: Decrease the column index (move along the negative x-axis).
// RIGHT: Increase the column index (move along the positive x-axis).

// board
let blocksize = 30;
let rows = 25;
let cols = 25;
let board;
let context;

// snake
let snakex;
let snakey;

// body
let sbody;

// food
let foodx;
let foody;

// movement
let dx;
let dy;

// gameover
let over;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    document.addEventListener("keyup", changeDirection);
    document.getElementById("playAgainBtn").addEventListener("click", resetGame);

    resetGame();
    setInterval(update, 1000 / 10);
}

function resetGame() {
    snakex = blocksize * 7;
    snakey = blocksize * 7;
    sbody = [];
    dx = 0;
    dy = 0;
    over = false;
    document.querySelector(".overz").style.visibility = "hidden";
    board.style.visibility = "visible";
    placeFood();
}

function update() {
    if (over) {
        return;
    }
    context.fillStyle = "#adb5bd";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "#009f93";
    context.fillRect(foodx, foody, blocksize, blocksize);

    if (snakex == foodx && snakey == foody) {
        sbody.push([foodx, foody]);
        placeFood();
    }
    for (let i = sbody.length - 1; i > 0; i--) {
        sbody[i] = sbody[i - 1];
    }
    if (sbody.length) {
        sbody[0] = [snakex, snakey];
    }

    context.fillStyle = "#e9ecef";
    snakex += dx * blocksize;
    snakey += dy * blocksize;
    context.fillRect(snakex, snakey, blocksize, blocksize);
    for (let i = 0; i < sbody.length; i++) {
        context.fillRect(sbody[i][0], sbody[i][1], blocksize, blocksize);
    }

    // gameover
    if (snakex < 0 || snakex >= cols * blocksize || snakey < 0 || snakey >= rows * blocksize) {
        gameOver();
    }

    for (let i = 0; i < sbody.length; i++) {
        if (snakex == sbody[i][0] && snakey == sbody[i][1]) {
            gameOver();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && dy != 1) {
        dx = 0;
        dy = -1;
    }
    if (e.code == "ArrowDown" && dy != -1) {
        dx = 0;
        dy = 1;
    }
    if (e.code == "ArrowLeft" && dx != 1) {
        dx = -1;
        dy = 0;
    }
    if (e.code == "ArrowRight" && dx != -1) {
        dx = 1;
        dy = 0;
    }
}

function placeFood() {
    foodx = Math.floor(Math.random() * cols) * blocksize;
    foody = Math.floor(Math.random() * rows) * blocksize;
}

function gameOver() {
    over = true;
    board.style.visibility = "hidden";
    document.querySelector(".overz").style.visibility = "visible";
}
