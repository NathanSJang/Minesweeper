/*----- constants -----*/


/*----- app's state (variables) -----*/
let bombs; // bomb#
let gameStatus;//win or gameover;
let width;

/*----- cached element references -----*/
const board = document.querySelector('.board');
const boxEl = document.querySelectorAll('.board > div');


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
  console.log(clickedBox);
  
  if (clickedBox.classList.contains('bomb')) {
    console.log('Game over');
  } if(clickedBox.classList.contains('good')) {
    countNum();
  }
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
    console.log(boxEl[i])
    const leftBOX = ( i % width === 0);
    const rightBox = (i % width === -1);
      
    if ( i > 0 && !leftBOX && boxEl[i - 1].classList.contains('bomb') ) countNum++ //left
    if ( i > 6 && !rightBox && boxEl[i + 1 - width].classList.contains('bomb') ) countNum++ // top-right
    if ( i > 7 && boxEl[i - width].classList.contains('bomb') ) countNum++ //top
    if ( i > 8 && !leftBOX && boxEl[i - 1 - width].classList.contains('bomb') ) countNum++ //top-left
    if ( i < 48 && !rightBox && boxEl[i + 1].classList.contains('bomb') ) countNum++//right
    if ( i < 42 && !leftBOX && boxEl[i - 1 + width].classList.contains('bomb') ) countNum++//bottom=left
    if ( i < 41 && !rightBox && boxEl[i + 1 + width].classList.contains('bomb') ) countNum++//bottom
    if ( i < 40 && boxEl[i + width].classList.contains('bomb')) countNum ++// bottom
    boxEl[i].setAttribute('data', countNum);
    console.log(boxEl[i]);
  } }


function render() {

  placeBomb();
}

function init() {
  bombs = 10;
  width = 7;

  render();
}