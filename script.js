const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const bRad = 7.5;
    
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let bSpeedX = 5;
let bSpeedY = -5;

const barW = 100;
const barH = 15;
let barX = (canvas.width - barW) / 2;


const brickW = 80;
const brickH = 20;
const brickPadding = 5;
const brickPadTop = 30;
const brickPadLeft = 30;

let rightPressed = false;
let leftPressed = false;

const bricks = [];
for (let c = 0; c < 5; c++) {

    bricks[c] = [];

    for (let r = 0; r < 3; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let score = 0;

function drawBall() {

    context.beginPath();
    context.arc(ballX, ballY, bRad, 0, Math.PI * 2);
    context.fillStyle = "#FF4500";
    context.fill();
    context.closePath();

}

function drawPaddle() {

    context.beginPath();
    context.rect(barX, canvas.height - barH, barW, barH);
    context.fillStyle = "#000";
    context.fill();
    context.closePath();

}

function drawBricks() {
    for (let c = 0; c < 5; c++) {

        for (let r = 0; r < 3; r++) {
            if (bricks[c][r].status === 1) {

                const brickX = c * (brickW + brickPadding) + brickPadLeft;
                const brickY = r * (brickH + brickPadding) + brickPadTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickW, brickH);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
            
            }
        }

    }
}

function collisionDetection() {
    for (let c = 0; c < 5; c++) {
        for (let r = 0; r < 3; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (ballX > b.x && ballX < b.x + brickW && ballY > b.y && ballY < b.y + brickH) 
                {
                    bSpeedY = -bSpeedY;
                    b.status = 0;
                    score++;

                    if (score === 3 * 5)
                    {
                        alert("Congratulations! You won!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: " + score, 8, 20);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    ballX += bSpeedX;
    ballY += bSpeedY;

    if (ballX + bSpeedX > canvas.width - bRad || ballX + bSpeedX < bRad) {
    bSpeedX = -bSpeedX;
    }

    if (ballY + bSpeedY < bRad) 
    {
        bSpeedY = -bSpeedY;
    } 
    else if (ballY + bSpeedY > canvas.height - bRad) 
    {
        if (ballX > barX && ballX < barX + barW) {
            bSpeedY = -bSpeedY;
        } 
        else 
        {
            alert("Game Over");
            location.reload();
        }
    }

    if (rightPressed && barX < canvas.width - barW) 
    {
        barX += 7;
    } 
    else if (leftPressed && barX > 0)
    {
        barX -= 7;
    }

    requestAnimationFrame(draw);
}



function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") 
    {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") 
    {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    
    if (e.key === "Right" || e.key === "ArrowRight") 
    {
        rightPressed = false;
    } 
    else if (e.key === "Left" || e.key === "ArrowLeft") 
    {
        leftPressed = false;
    }

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();