const yourShip = document.querySelector('.player');
const playArea = document.querySelector('#main-play-game');

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

window.addEventListener('keydown', FlyAhip);