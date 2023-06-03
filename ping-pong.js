const ball = {
    posX: 280,
    posY: 180,
    speedX: 10,
    speedY: Math.random() * 10 - 5,
    width: 40,
    height: 40,
    update: function () {
        const ballElem = document.getElementById("ball");
        ballElem.style.left = this.posX + "px";
        ballElem.style.top = this.posY + "px";
    }
};

const table = {
    width: 600,
    height: 400
};

const racquetLeft = {
    posX: 0,
    posY: table.height / 2 - 40,
    speedY: 0,
    width: 25,
    height: 80,
};

const racquetRight = {
    posX: table.width - 25,
    posY: table.height / 2 - 40,
    speedY: 0,
    width: 25,
    height: 80,
};

const goal = {
    goalLeft: 0,
    goalRight: 0,
    update: function () {
        const score = document.getElementById("score");
        score.innerHTML = this.goalLeft + ":" + this.goalRight;
    }
};

let timerMoveBall = null;
let timerAfterGoal = null;

const timer321 = document.getElementById("timerAfterGoal");

goal.update();

function timer () {
    setTimeout(() => timer321.innerHTML = "3", 1000);
    setTimeout(() => timer321.innerHTML = "2", 2000);
    setTimeout(() => timer321.innerHTML = "1", 3000);
    setTimeout(() => timer321.innerHTML = "", 4000);
}

function start() {
    timer();
    setTimeout(() => timerMoveBall = setInterval(moveBall, 40), 5000);
    const buttonStart = document.getElementById("start");
    buttonStart.setAttribute("disabled", "disabled");
}

function moveBall() {

    ball.posX += ball.speedX;

    function kontact(obj1, obj2) {
        return obj1.posX < obj2.posX + obj2.width &&
            obj1.posX + obj1.width > obj2.posX &&
            obj1.posY < obj2.posY + obj2.height &&
            obj1.posY + obj1.height > obj2.posY;
    }

    if (kontact(ball, racquetLeft)) {
        ball.speedX = - ball.speedX;
        ball.posX = racquetLeft.posX + racquetLeft.width;
    }

    else if (kontact(ball, racquetRight)) {
        ball.speedX = - ball.speedX;
        ball.posX = racquetRight.posX - ball.width;
    }

    if (ball.posX < 0) {
        leftGoal();
    }
    if (ball.posX > table.width - ball.width) {
        rightGoal();
    }

    ball.posY += ball.speedY;

    if (ball.posY + ball.height > table.height) {
        ball.speedY = - ball.speedY;
        ball.posY = table.height - ball.height;
    }

    if (ball.posY < 0) {
        ball.speedY = - ball.speedY;
        ball.posY = 0;
    }

    ball.update();
}

function moveRacquets() {

    const racquetLeftElem = document.getElementById("racquetLeft");
    racquetLeftElem.style.left = racquetLeft.posX + "px";
    racquetLeftElem.style.top = racquetLeft.posY + "px";
    racquetLeft.posY += racquetLeft.speedY;
    if (racquetLeft.posY + racquetLeft.height > table.height) {
        racquetLeft.posY = table.height - racquetLeft.height;
    }
    if (racquetLeft.posY < 0) {
        racquetLeft.posY = 0;
    }

    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case "ShiftLeft":
                racquetLeft.speedY = -10;
                break;
            case "ControlLeft":
                racquetLeft.speedY = 10;
                break;
            default:
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.code) {
            case "ShiftLeft":
                racquetLeft.speedY = 0;
                break;
            case "ControlLeft":
                racquetLeft.speedY = 0;
                break;
            default:
                break;
        }
    });

    const racquetRightElem = document.getElementById("racquetRight");
    racquetRightElem.style.left = racquetRight.posX + "px";
    racquetRightElem.style.top = racquetRight.posY + "px";
    racquetRight.posY += racquetRight.speedY;
    if (racquetRight.posY + racquetRight.height > table.height) {
        racquetRight.posY = table.height - racquetRight.height;
    }
    if (racquetRight.posY < 0) {
        racquetRight.posY = 0;
    }

    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case "ArrowUp":
                racquetRight.speedY = -10;
                break;
            case "ArrowDown":
                racquetRight.speedY = 10;
                break;
            default:
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.code) {
            case "ArrowUp":
                racquetRight.speedY = 0;
                break;
            case "ArrowDown":
                racquetRight.speedY = 0;
                break;
            default:
                break;
        }
    });
}

function moveBallAfterGoalLeft() {
    ball.posX = 270;
    ball.posY = 180;
    ball.speedX = 10;
    ball.speedY = Math.random() * 10 - 5;
    ball.update();
}

function moveBallAfterGoalRight() {
    ball.posX = 270;
    ball.posY = 180;
    ball.speedX = - 10;
    ball.speedY = Math.random() * 10 - 5;
    ball.update();
}

function leftGoal() {
    ball.posX = 0;
    ball.speedX = 0;
    ball.speedY = 0;
    ball.update();

    const leftGoal = document.getElementById("leftGoal");
    leftGoal.style.setProperty('display', 'inherit');
    setTimeout(() => leftGoal.style.setProperty('display', 'none'), 4000);
    goal.goalLeft = goal.goalLeft + 1;
    goal.update();

    timerAfterGoal = {
        timer: timer(),
        function: setTimeout(moveBallAfterGoalLeft, 5000),
    };
    if (goal.goalLeft === 5) {
        clearTimeout(timerAfterGoal);
        leftGoal.innerHTML = "End the game. Black lost";
        clearInterval(timerMoveBall);
        setTimeout(() => location.reload(), 5000);
    }
}


function rightGoal() {
    ball.posX = table.width - ball.width;
    ball.speedX = 0;
    ball.speedY = 0;
    ball.update();

    const rightGoal = document.getElementById("rightGoal");
    rightGoal.style.setProperty('display', 'inherit');
    setTimeout(() => rightGoal.style.setProperty('display', 'none'), 4000);
    goal.goalRight = goal.goalRight + 1;
    goal.update();

    timerAfterGoal = {
        timer: timer(),
        function: setTimeout(moveBallAfterGoalRight, 5000),
    };
    if (goal.goalRight === 5) {
        clearTimeout(timerAfterGoal);
        rightGoal.innerHTML = "End the game. Red lost";
        clearInterval(timerMoveBall);
        setTimeout(() => location.reload(), 5000);
    }
}
setInterval(moveRacquets, 40); 
ball.update();