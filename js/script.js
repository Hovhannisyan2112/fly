const container = document.getElementById('container');

const fly = container.querySelector('.fly');
const swatter = container.querySelector('.swatter');
const slapSound = container.querySelector('.slapSound');
const buzziSound = container.querySelector('.buzzi_sound');

let runner;
let newFly;

let x = 0;
let y = 0;
let dx = 10;
let dy = 10;

let positionX;
let positionY;

rendFly();
runFly();

//// create events //////////////////////////////////////////////////////////
function swatterCursor (e) {
    swatter.style.display = 'inline-block';
    swatterPosition(e);
}

function killFly (e) {
    swatterHit();
    overHit(e);
}

function killBack () {
    swatter.style.transform = 'scale(1)';
}


function swatterPosition (e) {
    swatter.style.left = `${e.x - swatter.clientWidth / 1.5}px`;
    swatter.style.top = `${e.y - swatter.clientHeight / 3}px`;
}

function swatterHit () {
    swatter.style.transform = 'scale(0.8)';
    slapSound.innerHTML = ` <audio autoplay>
                                <source src="./audio/slap.mp3" type="audio/mp3">
                            </audio>`;
}

function overHit (e) {
    if (e.x > positionX && e.x < positionX + fly.clientWidth &&
        e.y > positionY && e.y < positionY + fly.clientHeight) {
        clearInterval(runner);
        fly.innerHTML = `<img class="died-fly" src="./images/died-fly.png" alt="fly">`;
        buzziSound.innerHTML = '';
        if (newFly) {
            clearInterval(newFly)
        }
        newFly = setTimeout (() => {
            x = 0;
            y = 0;
            runFly()
            fly.innerHTML = `<img class="flying-fly" src="./images/fly.png" alt="fly">`;
            buzziSound.innerHTML = `<audio autoplay loop>
                                        <source src="./audio/buzzing.mp3" type="audio/mp3">
                                    </audio>`;
        }, 4 * 1000)
    }
}

//// create a fly ///////////////////////////////////////////////////////////////
function rendFly () {
    fly.innerHTML = `<img class="flying-fly" src="./images/fly.png" alt="fly">`;
    buzziSound.innerHTML = `<audio autoplay loop>
                                <source src="./audio/buzzing.mp3" type="audio/mp3">
                            </audio>`;
}

function runFly () {
    clearInterval(runner);
    runner = setInterval(() => {
        randomPosition();
        positionFly();
    }, 20);
};

function positionFly () {
    fly.style.transform = `translate(${x}px, ${y}px)`;
}

function randomPosition () {
    randomFlying();
    flyingBack();
    fixedPositions();
};

function randomFlying () {
    let r = Math.random();
    if (r < 0.05) {
        dy = 10;
    } else if (r < 0.1) {
        dy = -10;
    } else if (r < 0.15) {
        dy = 10;
    } else if (r < 0.2) {
        dy = -10;
    }
    x += dx;
    y += dy;
    x = Math.min(x, container.clientWidth - fly.clientWidth - 10);
    y = Math.min(y, container.clientHeight - fly.clientHeight - 10);
    x = Math.max(x, 0);
    y = Math.max(y, 0);
};

function flyingBack () {
    if (x === container.clientWidth - fly.clientWidth - 10 || x === 0) {
        dx *= -1;
    }
    if (y === container.clientHeight - fly.clientHeight - 10 || y === 0) {
        dy *= -1;
    }
};

function fixedPositions () {
    positionX = x;
    positionY = y;
}