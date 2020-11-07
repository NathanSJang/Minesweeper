/*----- constants -----*/


/*----- app's state (variables) -----*/
let bombs; // bomb#
let gameStatus;//win or gameover;
let width;

/*----- cached element references -----*/
const board = document.querySelector('.board');
const boxEl = document.querySelectorAll('.board > div');


/*----- event listeners -----*/


/*----- functions -----*/
init();

function placeBomb() {
  let leng = boxEl.length 
  let bombArray = Array(bombs).fill('bomb');
  let goodArray = Array(leng- bombs).fill('good');
  let gameArray = goodArray.concat(bombArray);
  let shuffle = gameArray.sort(() => Math.random() - 0.5);

  for(let i = boxEl.length - 1; i >= 0; i--){
    let box = boxEl[i]
    box.setAttribute('class', shuffle[i]);
    console.log(box);
    }
}

function countnearbomb() {
  for(let i =0; i < boxEl.length; i++) {
    console,log(i);

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