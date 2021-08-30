const gameBoard = require("./Gameboard");

const Player = (name) => {
  const gb = gameBoard()

  const fire = (x, y, enemyGB) => {
    enemyGB.receiveAttack(x, y);
  };

  const fireRandom = (enemyGB) => {
    let xRandom = -1;
    let yRandom = -1;
    let isCorrect = false;

    while (!isCorrect) {
      xRandom = Math.floor(Math.random() * 10);
      yRandom = Math.floor(Math.random() * 10);
      if (enemyGB.hitMatrix[xRandom][yRandom] === 0) isCorrect = true;
    };

    fire(xRandom, yRandom, enemyGB);
    return [xRandom, yRandom];
  };

  return { name, gb, fire, fireRandom };
};

module.exports = Player;