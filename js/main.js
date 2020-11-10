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
// boxEl.forEach(box => {box.addEventListener('contextmenu', rightClick)})

document.getElementById('replay')
  .addEventListener('click', init);

/*----- functions -----*/
init();

// function rightClick(e) {
//   e.preventDefault();
  
// }

function handleClick(e) {
  const box = Array.from(boxEl);
  const index = box.indexOf(e.target);
  const clickedBox = boxEl[index];

  console.log(index);

  if(gameStatus) return;
  if(boxEl[index].classList.contains('check')) return;
  
  if (clickedBox.classList.contains('bomb')) {
    gameStatus = false;
  } else if(clickedBox.classList.contains('good')) {
    countNum();
    
    let num = clickedBox.getAttribute('data');
    if (num != 0) {
      clickedBox.classList.add('check');
      clickedBox.innerHTML = num;
    } else {
      clickedBox.classList.add('check');
      checkNearBox(box, index);
    }
    return clickedBox.classList.add('check');
  } 
  
  gameStatus = gameOver();
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
    return
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

function checkNearBox(box, index) {
  const leftBox = (index % width === 0);
  const rightBox = (index %width === (width - 1));

  function checkNum(el) {
    let num = el.getAttribute('data');
    el.innerHTML = num;
    return el.classList.add('check');
  }
  if (index > 0 && !leftBox) {
    const newTarget = boxEl[index - 1]
    checkNum(newTarget);
  }
  if (index > 6 && !rightBox) {
    const newTarget = boxEl[index + 1 -width]
    checkNum(newTarget);
  }
  if (index > 7) {
    const newTarget = boxEl[index - width]
    checkNum(newTarget);
  }
  if (index > 8 && !leftBox) {
    const newTarget = boxEl[index - 1 - width]
    checkNum(newTarget);
  }
  if (index < 48 && !rightBox) {
    const newTarget = boxEl[index + 1]
    checkNum(newTarget);
  }
  if (index < 42 && !leftBox) {
    const newTarget = boxEl[index - 1 + width]
    checkNum(newTarget);
  }
  if (index < 41 && !rightBox) {
    const newTarget = boxEl[index + 1 + width]
    checkNum(newTarget);
  }
  if (index < 40 && !rightBox) {
    const newTarget = boxEl[index + width]
    checkNum(newTarget);
  }
}


function gameOver() {
  gameStatus = true;

  boxEl.forEach(box => {
    if (box.classList.contains('bomb')) {
      box.style.backgroundImage ='url(image/bomb.png)'
    }
  })
}


function clearBoard() {
  boxEl.forEach(box => {box.setAttribute('data', '0')});
  boxEl.forEach(box => box.innerText = '');
  boxEl.forEach(box => box.style.backgroundImage = 'none')
}

function renderMessage() {
  if (gameStatus === null) {
    msgEl.textContent = `Let's Find the Bomb!`
  } else if (gameStatus) {
    return msgEl.textContent = `You win`
  } else {
    return msgEl.textContent = `You Lose`;
  }
}

function render() {

  placeBomb();
  renderMessage();
}

function init() {
  bombs = 10;
  width = 7;
  gameStatus = false;

  clearBoard();
  render();
}