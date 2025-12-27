const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball
let ballX = 200;
let ballY = 150;
let ballDX = 2;
let ballDY = 2;
let ballRadius = 8;

// Paddle
let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = 160;

// Mouse movement
document.addEventListener("mousemove", movePaddle);

function movePaddle(e) {
  const rect = canvas.getBoundingClientRect();
  paddleX = e.clientX - rect.left - paddleWidth / 2;
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = "white";
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 5, paddleWidth, paddleHeight);
}

// Game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  ballX += ballDX;
  ballY += ballDY;

  // Wall bounce
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballDX = -ballDX;
  }

  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  }

  // Paddle collision
  if (
    ballY + ballRadius > canvas.height - paddleHeight - 5 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballDY = -ballDY;
  }

  // Game over
  if (ballY > canvas.height) {
    alert("Game Over!");
    document.location.reload();
  }

  requestAnimationFrame(draw);
}

draw();

