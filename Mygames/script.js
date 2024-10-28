
        const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{x : 200, y: 200}];
let food = getRandomFoodPosition();
let dx = boxSize;
let dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);
function gameLoop() {
    if (gameOver()) {
        alert(`Game Over! Skor Anda: ${score}`);
        document.location.reload();
    } else {
        setTimeout(() => {
            clearBoard();
            moveSnake();
            drawFood();
            drawSnake();
            gameLoop(); // Memanggil fungsi gameLoop lagi
        }, 100);
    }
}


function clearBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = "green";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function getRandomFoodPosition() {
    let foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    let foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x: foodX, y: foodY };
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -boxSize;
    const goingDown = dy === boxSize;
    const goingRight = dx === boxSize;
    const goingLeft = dx === -boxSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -boxSize;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -boxSize;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = boxSize;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = boxSize;
    }
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

gameLoop();
