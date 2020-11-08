/*----- constants -----*/


/*----- app's state (variables) -----*/
let bombs; // bomb#
let gameStatus;//win or gameover;
let width;

/*----- cached element references -----*/
const board = document.querySelector('.board');
const boxEl = document.querySelectorAll('.board > div');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
boxEl.forEach(box => {box.addEventListener('click', handleClick)})

document.getElementById('replay')
  .addEventListener('click', init);

/*----- functions -----*/
init();

function handleClick(e) {
  const box = Array.from(boxEl);
  const index = box.indexOf(e.target);
  const clickedBox = boxEl[index]
  const currentId = clickedBox.id;
  // console.log(clickedBox);
  
  if(gameStatus) return;
  if(clickedBox.classList.contains('check')) return;
  
  if (clickedBox.classList.contains('bomb')) {
    gameStatus = false;
  } else if(clickedBox.classList.contains('good')) {
    countNum();
    
    let num = clickedBox.getAttribute('data');
    if (num != 0) {
      clickedBox.classList.add('check');
      clickedBox.innerHTML = num;
    }
  return clickedBox.classList.add('check'); 
  }
  gameStatus = winMine();

  render();
}


function placeBomb() {
  let leng = boxEl.length 
  let bombArray = Array(bombs).fill('bomb');
  let goodArray = Array(leng- bombs).fill('good');
  let gameArray = goodArray.concat(bombArray);
  let shuffle = gameArray.sort(() => Math.random() - 0.5);

  for(let i = 0; i < boxEl.length; i++){
    let box = boxEl[i]
    box.setAttribute('class', shuffle[i]);
    }
}

function countNum() {
  for(let i =0; i < boxEl.length; i++) {
    let countNum =0;

    const leftBOX = (i % width === 0);
    const rightBox = (i % width === -1);
      
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
  const leftBOX = ( currentId % width === 0);
  const rightBox = (currentId % width === -1);

  if (currentId > 0 && !leftBOX) {
    const newId = clickedBox[currentId -1].id;
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 6 && !rightBox) {
    const newId = clickedBox[currentId +1 - width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 7) {
    const newId = clickedBox[currentId - width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 8 && !leftBox) {
    const newId = clickedBox[currentId -1 - width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 48 && !rightBox) {
    const newId = clickedBox[currentId +1]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 42 && !leftBox) {
    const newId = clickedBox[currentId -1 +width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 41) {
    const newId = clickedBox[currentId +1 +width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
  if (currentId > 40 && !rightBox) {
    const newId = clickedBox[currentId + width]
    const newBox = document.getElementById(newId);
    countNum(newBox);
  }
}

function winMine() {
  if(bombs === 0) gameStatus === true;
}

function renderMessage() {
  if (gameStatus === null) {
    msgEl.textContent = `Let's Find the Bomb!`
  } else if (gameStatus) {
    msgEl.textContent = `You win`
  } else {
    msgEl.textContent = `You Lose`;
  }
}

function render() {

  placeBomb();
  renderMessage();
}

function init() {
  bombs = 10;
  width = 7;
  gameStatus = null;

  render();
}