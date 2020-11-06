/*----- constants -----*/


/*----- app's state (variables) -----*/
let boxes;
let bomb;



/*----- cached element references -----*/
const board = document.querySelector('.board');
// const box = document.createElement('div');

/*----- event listeners -----*/


/*----- functions -----*/
init();

// function makeboard() {
//   for (let i = 0; i < width * width; i++) {
//     const box = document.createElement('div');
//     box.setAttribute('id', i);
//     board.appendChild(box);
//     boxes.push(box);
//   }
// }

function render() {

}

function init() {
  boxes = [];
  
  render();
}