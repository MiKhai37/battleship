import  './style.css';
import Player from './modules/Player';
import UI from './modules/UI';

const pl1 = Player('Human');
const pl2 = Player('Computer');
const ui = UI();
let currentPlayer = pl1;
let otherPlayer = pl2;

pl1.gb.placeh(3, 2, 2);
pl1.gb.placev(4, 3, 3);
pl1.gb.placeh(2, 8, 8);
pl2.gb.placeh(3, 2, 2);
pl2.gb.placev(4, 3, 3);

ui.renderUI(pl1, pl2);

const gridItems = document.querySelectorAll('.grid-item');
const separator = document.querySelector('.separator');

gridItems.forEach(gridItem => {
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
      return
    }

    otherPlayer.gb.receiveAttack(x, y);
    gridItem.classList.add('hit');

    const shipID = otherPlayer.gb.whichShip(x, y);

    if (shipID > -1) {
      console.log(otherPlayer.gb.ships[shipID].isSunk());
      if (otherPlayer.gb.ships[shipID].isSunk()) {
        const shipSunkCoord = otherPlayer.gb.shipPositions[shipID]
        shipSunkCoord.forEach(coord => {
          const shipItem = document.querySelector(`.${side}[data-x="${coord[0].toString()}"][data-y="${coord[1].toString()}"]`);
          shipItem.classList.remove('ship');
          shipItem.classList.remove('hit');
          shipItem.classList.add('sunk');
        });
      };
    };

    const temp = currentPlayer;
    currentPlayer = otherPlayer;
    otherPlayer = temp;
    separator.textContent = `${currentPlayer.name} Turn`;

    if (currentPlayer.gb.isAllDown() | otherPlayer.gb.isAllDown()) {
      console.log('Game Over');
    };

  })
});

