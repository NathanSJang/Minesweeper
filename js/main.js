/*----- constants -----*/


/*----- app's state (variables) -----*/
let boxes;
let bombs;



/*----- cached element references -----*/
const board = document.querySelector('.board');
// const box = document.createElement('div');

/*----- event listeners -----*/


/*----- functions -----*/
init();



function fillArray() {
  let bombArray = Array(bombs).fill('bomb');
  let goodArray = Array(49 - bombs).fill('good');
  let gameArray = goodArray.concat(bombArray);
  return boxes = gameArray;
}

function random() {
  return boxes.sort(() => Math.random() - 0.5);
}

function render() {

  fillArray();
  random();
}

function init() {
  boxes = [];
  bombs = 10;

  render();
}