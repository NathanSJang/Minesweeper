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
  console.log(index);
  
  if (boxEl[index].classList.contains('bomb')) {
    console.log('Game over');
  } if(boxEl[index].classList.contains('good')) {
    console.log('good');
  }
}

function placeBomb() {
  let leng = boxEl.length 
  let bombArray = Array(bombs).fill('bomb');
  let goodArray = Array(leng- bombs).fill('good');
  let gameArray = goodArray.concat(bombArray);
  let shuffle = gameArray.sort(() => Math.random() - 0.5);

  for(let i =0 ; i < boxEl.length - 1; i++){
    let box = boxEl[i]
    box.setAttribute('class', shuffle[i]);
    }
}

function countNearBomb() {
  for(let i =0; i < boxEl.length; i++) {
    let countNum =0;


  }
}



function render() {

  placeBomb();
}

function init() {
  bombs = 10;
  width = 7;

  render();
}