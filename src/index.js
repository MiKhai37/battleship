import  './style.css';
import Player from './modules/Player';
import UI from './modules/UI';
import Game from './modules/Game';

const game = Game();

game.posRandom(game.human);
game.posRandom(game.computer);

game.ui.renderUI(game.human, game.computer);

game.gameLoopHvsC();

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



