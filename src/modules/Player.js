const gameBoard = require("./Gameboard");

const Player = (name) => {
  const gb = gameBoard()
  let lastFire = [-1, -1];

  const fire = (x, y, enemyGB) => {
    enemyGB.receiveAttack(x, y);
    lastFire = [x, y];
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
    lastFire = [xRandom, yRandom];
    return [xRandom, yRandom];
  };

  const fireSmart = (enemyGB) => {
    if (lastFire[0] === -1 & lastFire[1] === -1) return fireRandom(enemyGB);

    const smartPosition = [[lastFire[0] + 1, lastFire[1]], [lastFire[0] - 1, lastFire[1]], [lastFire[0], lastFire[1] + 1], [lastFire[0], lastFire[1] - 1]];
    
    const i = Math.floor(Math.random() * 4);
    fire(smartPosition[i][0], smartPosition[i][1], enemyGB);

    return [smartPosition[i][0], smartPosition[i][1]];
  };

  return { name, gb, fire, fireRandom, fireSmart };
};

module.exports = Player;