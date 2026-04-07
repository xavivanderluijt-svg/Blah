// Game.js for a 2D platformer game

// Variables
let canvas, context;
let player;
let platforms = [];
let enemies = [];
let gravity = 0.5;

// Initialize the game
function init() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    player = new Player();
    createPlatforms();
    createEnemies();
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    player.update();
    handleCollisions();
}

// Render the game
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.render();
    platforms.forEach(platform => platform.render());
    enemies.forEach(enemy => enemy.render());
}

// Player class
class Player {
    constructor() {
        this.x = 50;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.velocityY = 0;
        this.jumping = false;
    }

    update() {
        this.velocityY += gravity;
        this.y += this.velocityY;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.jumping = false;
        }
    }

    jump() {
        if (!this.jumping) {
            this.velocityY = -10;
            this.jumping = true;
        }
    }

    render() {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Create platforms
function createPlatforms() {
    platforms.push(new Platform(100, 300, 200, 20));
    platforms.push(new Platform(400, 200, 200, 20));
}

// Platform class
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render() {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Create enemies
function createEnemies() {
    enemies.push(new Enemy(300, 250));
}

// Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.direction = 1;
    }

    update() {
        this.x += this.direction;
        if (this.x > canvas.width - this.width || this.x < 0) {
            this.direction *= -1;
        }
    }

    render() {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Handle collisions
function handleCollisions() {
    platforms.forEach(platform => {
        if (player.y + player.height > platform.y && player.y < platform.y + platform.height && 
            player.x < platform.x + platform.width && player.x + player.width > platform.x) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.jumping = false;
        }
    });
}

init();