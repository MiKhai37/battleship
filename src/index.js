import  './style.css';
import Player from './modules/Player';
import UI from './modules/UI';

const pl1 = Player('Roger');
const pl2 = Player('Computer');
const ui = UI();
let turn = true;


pl1.gb.placeh(3, 2, 2);
pl1.gb.placev(4, 3, 3);
pl2.gb.placeh(3, 2, 2);
pl2.gb.placev(4, 3, 3);

ui.renderUI(pl1, pl2);

const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => {
  gridItem.addEventListener('click', (e) => {
    gridItem.classList.add('hit');
    if (pl1.name === gridItem.dataset.name & turn) {
      pl1.gb.receiveAttack(gridItem.dataset.x, gridItem.dataset.y);
    } else {
      pl2.gb.receiveAttack(gridItem.dataset.x, gridItem.dataset.y);
    }
    turn = !turn;
  })
});

