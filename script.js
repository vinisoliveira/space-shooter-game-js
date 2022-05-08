const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster_1.png', 'img/monster_2.png', 'img/monster_3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button')


// MOVIMENTO E TIRO DA NAVE
function FlyShip(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

//FUNÇÃO QUE SOBE
function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "10px"){
        return
    }else{
        let position = parseInt(topPosition);
        position -= 10;
        yourShip.style.top = `${position}px`;
     }   
}

//FUNÇÃO DE DESCER
function moveDown(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "530px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 10;
        yourShip.style.top = `${position}px`
    }
}

// FUNÇÃO ATIRA
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition -19}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) =>{
            if(checkLaserCollision(laser, alien)){
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10);
}

function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; // SORTEIO DE IMAGEM(ALIENS)
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

// FUNÇÃO PARA MOVIMENTAR OS INIMIGOS
function moveAlien(alien){
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
        if(xPosition <= 50){
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            } 
        }else {
            alien.style.left = `${xPosition - 4}px`
        }
    }, 30)
}

// FUNÇÃO PARA COLISÃO
function checkLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;

    if(laserLeft != 340 && laserLeft + 40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienBottom){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// INICIO DO JOGO
startButton.addEventListener('click', (event) =>{
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display= 'none';
    window.addEventListener('keydown', FlyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000)
}

// GAME OVER

function gameOver() {
    window.removeEventListener('keydown', FlyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove())
    setTimeout(() => {
        alert('FIM DE JOGO');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    })
}
