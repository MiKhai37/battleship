import  './style.css';
import { ship } from './modules/Ship'
import Player from './modules/Player';
import gameBoard from './modules/Gameboard';

function gameLoop(){
  const gb1 = gameBoard();
  const gb2 = gameBoard();
  const pl1 = Player('Pierre', gb1, gb2);
  const pl2 = Player('Computer', gb2, gb1);
  const turn = true;
  gb1.placeh(3, 2, 2);
  gb1.placev(4, 3, 3);
  gb2.placeh(3, 2, 2);
  gb2.placev(4, 3, 3);

  while(!gb1.isAllDown() & !gb2.isAllDown()) {
    if (turn) {
      pl1.fireAI();
    } else {
      pl2.fireAI();
    }
    turn = !turn
  }
}