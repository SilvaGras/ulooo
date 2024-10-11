const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // size of each grid cell
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: gridSize, y: 0 };
let food = generateFood();
let score = 0;
let gameInterval;

function startGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 };
    score = 0;
    document.getElementById('score').textContent = score;
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100); // update every 100 milliseconds
}

function updateGame() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls or itself
    if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= canvas.width ||
        newHead.y >= canvas.height ||
        isCollision(newHead, snake)
    ) {
        alert('Game Over! Your final score is ' + score);
        clearInterval(gameInterval);
        return;
    }

    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        food = generateFood();
    } else {
        snake.pop(); // remove the tail if no food eaten
    }

    drawGame();
}

function drawGame() {
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = '#007bff';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function isCollision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}

// Handle keyboard input for controlling the snake
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (keyPressed === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

// Start the game on page load
startGame();