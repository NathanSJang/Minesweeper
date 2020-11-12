/*----- constants -----*/
const gameArray = [
  "good", "good", "good", "good", "good", "good", "good", "good", "good", 
  "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", 
  "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", 
  "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", 
  "bomb", "bomb", "bomb", "bomb", "bomb", "bomb", "bomb", "bomb", "bomb", "bomb"
]

/*----- app's state (variables) -----*/
let bombs; // bomb#
let gameStatus;//win or gameover;
let width;
let flag;

/*----- cached element references -----*/
const boxEl = document.querySelectorAll('.board > div');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
boxEl.forEach(box => {box.addEventListener('click', handleClick)})
boxEl.forEach(box => {box.addEventListener('contextmenu', rightClick)})

document.getElementById('replay').addEventListener('click', init);

/*----- functions -----*/
init();

function rightClick(e) {
  e.preventDefault();
  if(gameStatus === false) return;
  const clickedBox = e.target;
  
  mayBeBomb(clickedBox);
  render();
}

function handleClick(e) {
  const clickedBox = e.target;
  boxClick(clickedBox);
  render();
}

function boxClick(clickedBox) {
    const currentId = clickedBox.id;

    if(gameStatus === true || gameStatus === false) return;
    if(clickedBox.classList.contains('check')  || clickedBox.classList.contains('flag')) return;
    
    if (clickedBox.classList.contains('bomb')) {
      gameOver();
    } else if(clickedBox.classList.contains('good')) {
      countNum();
      
      let num = clickedBox.getAttribute('data');
      if (num != 0) {
        clickedBox.classList.add('check');
        clickedBox.innerHTML = num;
        return;
      }else {
      clickedBox.classList.add('check');
      checkNearBox(clickedBox, currentId);
    }
  }
}

function placeBomb() {
  let shuffle = gameArray.sort(() => Math.random() - 0.5);

  for(let i = 0; i < boxEl.length; i++){
    let box = boxEl[i];
    box.setAttribute('class', shuffle[i]);
    }

}

function countNum() {
  for(let i =0; i < boxEl.length; i++) {
    let countNum =0;

    const leftBOX = (i % width === 0);
    const rightBox = (i % width === (width - 1));
      
    if ( i > 0 && !leftBOX && boxEl[i - 1].classList.contains('bomb') ) countNum++; //left
    if ( i > 6 && !rightBox && boxEl[i + 1 - width].classList.contains('bomb') ) countNum++; // top-right
    if ( i > 7 && boxEl[i - width].classList.contains('bomb') ) countNum++; //top
    if ( i > 8 && !leftBOX && boxEl[i - 1 - width].classList.contains('bomb') ) countNum++; //top-left
    if ( i < 48 && !rightBox && boxEl[i + 1].classList.contains('bomb') ) countNum++;//right
    if ( i < 42 && !leftBOX && boxEl[i - 1 + width].classList.contains('bomb') ) countNum++;//bottom=left
    if ( i < 41 && !rightBox && boxEl[i + 1 + width].classList.contains('bomb') ) countNum++;//bottom
    if ( i < 40 && boxEl[i + width].classList.contains('bomb')) countNum ++;// bottom
    boxEl[i].setAttribute('data', countNum);
  } 
}

function checkNearBox(clickedBox, currentId) {
  const leftBox = (currentId % width === 0);
  const rightBox = (currentId % width === (width - 1));


  if (currentId > 0 && !leftBox) {
    const newTarget = boxEl[parseInt(currentId) - 1];
    boxClick(newTarget);
  }
  if (currentId > 6 && !rightBox) {
    const newTarget = boxEl[parseInt(currentId) + 1 - width];
    boxClick(newTarget);
  }
  if (currentId > 7) {
    const newTarget = boxEl[parseInt(currentId) - width];
    boxClick(newTarget);
  }
  if (currentId > 8 && !leftBox) {
    const newTarget = boxEl[parseInt(currentId) - 1 - width];
    boxClick(newTarget);
  }
  if (currentId < 48 && !rightBox) {
    const newTarget = boxEl[parseInt(currentId) + 1];
    boxClick(newTarget);
  }
  if (currentId < 42 && !leftBox) {
    const newTarget = boxEl[parseInt(currentId) - 1 + width];
    boxClick(newTarget);
  }
  if (currentId < 41 && !rightBox) {
    const newTarget = boxEl[parseInt(currentId) + 1 + width];
    boxClick(newTarget);
  }
  if (currentId < 40) {
    const newTarget = boxEl[parseInt(currentId) + width];
    boxClick(newTarget);
  }
}

function mayBeBomb(clickedBox) {
  if (!clickedBox.classList.contains('check') && (flag < bombs)) {
    if (!clickedBox.classList.contains('flag')) {
      clickedBox.classList.add('flag');
      clickedBox.innerHTML = '🏳️‍🌈';
      flag ++;
      return win();
    } else {
      clickedBox.classList.remove('flag');
      clickedBox.innerHTML = '';
      return flag --;
    }
  }
  if (gameStatus === fasle) {
    clickedBox.innerHTML = '';
  }
}

function win() {
  findbomb = 0;
  
  for (let i =0; i < boxEl.length; i++) {
    if(boxEl[i].classList.contains('flag') && boxEl[i].classList.contains('bomb')) {
      findbomb ++;
    }
    if (findbomb === bombs) {
      return gameStatus = true;
    }
  }
  
}

function gameOver() {
  gameStatus = false;
  boxEl.forEach(box => {
    if (box.classList.contains('bomb')) {
      box.classList.add('check')
      return box.style.backgroundImage = 'url(image/bomb.png)';
    }
  })
}

function clearBoard() {
  boxEl.forEach(box => {box.setAttribute('data', '0')});
  boxEl.forEach(box => box.innerText = '');
  boxEl.forEach(box => box.style.backgroundImage = 'none');
}

function renderMessage() {
  if (gameStatus === null) {
    msgEl.textContent = `Let's Find the Bomb!`;
  } else if (gameStatus === true) {
    msgEl.textContent = `You win`;
  } else {
    return msgEl.textContent = `You Lose`;
  }
}

function render() {
  renderMessage();
}

function init() {
  bombs = 10;
  width = 7;
  gameStatus = null;
  flag = 0;

  placeBomb();
  clearBoard();

  render();
}