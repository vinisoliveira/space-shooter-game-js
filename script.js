const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster_1.png', 'img/monster_2.png', 'img/monster_3.png']

// MOVIMENTO E TIRO DA NAVE
function FlyAhip(event){
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

        if(xPosition === 340){
            laser.remove()
        }else{
            laser.style.left = `${xPosition + 8}px`
        }
    }, 10)
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
    moveAlie(newAlien);
}

window.addEventListener('keydown', FlyAhip);