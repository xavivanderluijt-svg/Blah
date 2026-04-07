// game.js

// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set initial canvas size
resizeCanvas();

// Player movement variables
let playerX = canvas.width / 2;
const playerSpeed = 5;

// Keyboard controls
function moveLeft() {
    playerX -= playerSpeed;
    draw();
}

function moveRight() {
    playerX += playerSpeed;
    draw();
}

// Event listeners for keyboard controls
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    }
});

// Event listeners for mobile touch controls
canvas.addEventListener('touchstart', (event) => {
    const touchX = event.touches[0].clientX;
    if (touchX < canvas.width / 2) {
        moveLeft();
    } else {
        moveRight();
    }
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
});

// Resize canvas to fit window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Redraw function
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'blue';
    context.fillRect(playerX, canvas.height - 50, 50, 50);
}

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Initial draw
draw();