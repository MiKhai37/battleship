import  './style.css';
import Player from './modules/Player';
import UI from './modules/UI';
import Game from './modules/Game';

const game = Game();


const pl1 = game.human;
const pl2 = game.computer;
const ui = UI();
let currentPlayer = pl1;
let otherPlayer = pl2;

game.posRandom(pl1);
game.posRandom(pl2);

ui.renderUI(pl1, pl2);

const gridItems = document.querySelectorAll('.grid-item');
const separator = document.querySelector('.separator');
separator.textContent = currentPlayer.name;

/* gridItems.forEach(gridItem => {
  gridItem.addEventListener('click', (e) => {
    
    const x = parseInt(gridItem.dataset.x);
    const y = parseInt(gridItem.dataset.y);
    const side = gridItem.dataset.name;

    if (otherPlayer.gb.hitMatrix[x][y] === 1) {
      console.log('Already hit');
      return;
    }

    if (side ===  currentPlayer.name) {
      console.log('Not your turn');
      return;
    }

    otherPlayer.gb.receiveAttack(x, y);
    gridItem.classList.add('hit');

    ui.renderSunkShip(currentPlayer);
    ui.renderSunkShip(otherPlayer);

    if (currentPlayer.gb.isAllDown() | otherPlayer.gb.isAllDown()) {
      console.log('Game Over');
    };

    const temp = currentPlayer;
    currentPlayer = otherPlayer;
    otherPlayer = temp;
    separator.textContent = `${currentPlayer.name} Turn`;
  })
}); */

/* gridItems.forEach(gridItem => {
  gridItem.addEventListener('click', (e) => {
    console.log(e)
    const x = parseInt(gridItem.dataset.x);
    const y = parseInt(gridItem.dataset.y);

    if (pl2.gb.hitMatrix[x][y] === 1 | gridItem.dataset.name === pl1.name) return;

    pl1.fire(x, y, pl2.gb)
    gridItem.classList.add('hit');

    const [xRandom, yRandom] = [...pl2.fireRandom(pl1.gb)];
    const gridRandom = document.querySelector(`.${pl1.name}[data-x="${xRandom}"][data-y="${yRandom}"]`)
    gridRandom.classList.add('hit');

    ui.renderSunkShip(currentPlayer);
    ui.renderSunkShip(otherPlayer);

    if (pl1.gb.isAllDown() | pl2.gb.isAllDown()) console.log('GameOver');
  })
}); */

game.gameLoopHvsC();

